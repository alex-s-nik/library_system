import pytest

from library.models import Action
from library.services import return_book_to_library, take_book_to_visitor

class TestActions:
    @pytest.mark.django_db(transaction=True)
    def test_take_book_to_visitor(self, book1, visitor1, first_user):
        take_book_to_visitor(
            book=book1,
            visitor=visitor1,
            executor=first_user
        )

        assert book1.in_library == False


        return_book_to_library(
            book=book1,
            executor=first_user
        )

        assert Action.objects.count() == 1
        assert book1.in_library == True

