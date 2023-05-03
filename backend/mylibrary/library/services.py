from datetime import datetime

from django.db import IntegrityError

from .models import Action, Book, Visitor
from users.models import User


def take_book_to_visitor(book: Book, visitor: Visitor, executor: User):
    if not book.in_library:
        raise IntegrityError('The book has been taken for other visitor')
    book.in_library = False
    Action.objects.create(
        book=book,
        visitor=visitor,
        taken_by=executor
    )
    book.save()


def return_book_to_library(book: Book, executor: User):
    if book.in_library:
        raise IntegrityError('The book is in library already')
    taken_action = Action.objects.get(
        book=book,
        return_date=None
    )
    taken_action.return_date = datetime.now()
    taken_action.returned_by = executor
    taken_action.save()

    book.in_library = True
    book.save()
