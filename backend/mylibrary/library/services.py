from datetime import datetime

from django.db import IntegrityError
from django.db.models import F

from .models import Action, Book, Visitor
from users.models import User


def take_book_to_visitor(book: Book, visitor: Visitor, executor: User) -> Action:
    if not book.in_library:
        raise IntegrityError('The book has been taken for other visitor')
    book.in_library = False
    taken_action = Action.objects.create(
        book=book,
        visitor=visitor,
        taken_by=executor
    )
    book.save()
    return taken_action


def return_book_to_library(book: Book, executor: User) -> Action:
    if book.in_library:
        raise IntegrityError('The book is in library already')
    return_action = Action.objects.get(
        book=book,
        return_date=None
    )
    return_action.return_date = datetime.now()
    return_action.returned_by = executor
    return_action.save()

    book.in_library = True
    book.save()

    return return_action


def get_all_book_given_to_visitor_now(visitor: Visitor) -> list[dict[Book, datetime]]:
    """Книги, находящиеся на руках у читателя в данный момент."""

    # Для начала найдем все книги, выданные на руки через Действия.
    # Эти книги можно найти по действиям, у которых не проставлено время возврата
    # т.е. <action_obj>.return_date == NULL
    # В целом SQL-запрос должен выглядеть так:
    # SELECT library_book.*, library_action.taken_date AS "taken_at"
    # FROM library_book INNER JOIN library_action ON library_book.id = library_action.book_id
    # WHERE library_action.return_date IS NULL

    # В результате из выражения orm
    # Book.objects.filter(actions__return_date__isnull=True).annotate(taken_at=F('actions__taken_date'))
    # получим сгенерированный django sql-запрос:
    # SELECT 
    #   "library_book"."id",
    #   "library_book"."created_by_id",
    #   "library_book"."created_at",
    #   "library_book"."title",
    #   "library_book"."description",
    #   "library_book"."in_library",
    #   "library_action"."taken_date" AS "taken_at"
    # FROM "library_book" LEFT OUTER JOIN "library_action"
    #   ON ("library_book"."id" = "library_action"."book_id")
    # WHERE "library_action"."return_date" IS NULL
    # Из-за LEFT OUTER получим в результате и те книги, над которыми
    # еще не производили никаких действий.
    # Учтем это условием <action_obj>.taken_date NOT IS NULL
    # т.к. при добавлении Действия это поле заполняется по умолчанию.
    # Теперь для получения итогового результата достаточно добавить
    # условие отбора по посетителю.
    annotated_books = Book.objects.filter(
        actions__return_date__isnull=True,
        actions__taken_date__isnull=False,  # <-- из комментов выше
        actions__visitor=visitor            # условие отбора по посетителю
    ).annotate(taken_at=F('actions__taken_date'))
    return annotated_books
