from django.db import IntegrityError
import pytest

from library.models import Action, Book
from library.services import return_book_to_library, take_book_to_visitor

class TestActions:
    @pytest.mark.django_db(transaction=True)
    def test_book_moving(self, book1, visitor1, first_user):
        """Тест на выдачу  и прием книги обратно."""

        assert Book.objects.count() > 0, 'В БД нет книг'
        book = Book.objects.get(id=book1.id)

        take_book_to_visitor(
            book=book,
            visitor=visitor1,
            executor=first_user
        )

        assert book.in_library == False, 'У выданной книги статус должен быть "не в библиотеке"'

        # попытка выдать выданную книгу
        with pytest.raises(IntegrityError) as msg:
            take_book_to_visitor(
                book=book,
                visitor=visitor1,
                executor=first_user
            )

        return_book_to_library(
            book=book,
            executor=first_user
        )

        #попытка сдать сданную книгу
        with pytest.raises(IntegrityError) as msg:
            return_book_to_library(
                book=book,
                executor=first_user
            )

        assert Action.objects.count() == 1
        action = Action.objects.all()[0]
        assert action.return_date is not None
        assert book.in_library == True, 'У книги возвращенной в библиотеку статус должен быть "в библиотеке"'
