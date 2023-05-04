from datetime import datetime

from django.db import IntegrityError

from .models import Action, Book, Visitor
from users.models import User


def take_book_to_visitor(book: Book, visitor: Visitor, executor: User):
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


def return_book_to_library(book: Book, executor: User):
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
