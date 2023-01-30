import pytest
from mixer.backend.django import mixer

from library.models import Book, Visitor


@pytest.fixture
def three_books(first_user):
    return mixer.cycle(3).blend(
        Book,
        created_by=first_user
    )

@pytest.fixture
def three_visitors(first_user):
    return mixer.cycle(3).blend(
        Visitor,
        created_by=first_user
    )
