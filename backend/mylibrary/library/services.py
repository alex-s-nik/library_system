from datetime import datetime

from .models import Action, Book, Visitor
from users.models import User


def take_book_to_visitor(book: Book, visitor: Visitor, executor: User):
    if not book.in_library:
        raise Exception('The book has been taken for other visitor')
    Action.objects.create(
        book=book,
        visitor=visitor,
        taken_by=executor
    )


def return_book_to_library(book: Book, executor: User):
    if book.in_library:
        raise Exception('The book is in library already')
    taken_action = Action.objects.get(
        book=book,
        return_date=None
    )
    taken_action.return_date = datetime.now()
    taken_action.returned_by = executor
    print(taken_action)
    taken_action.save()
