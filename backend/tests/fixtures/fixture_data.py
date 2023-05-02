import pytest
from mixer.backend.django import mixer

from library.models import Book, Visitor


@pytest.fixture
def book1(first_user):
    return mixer.blend(
        Book,
        created_by=first_user
    )

@pytest.fixture
def visitor1(first_user):
    return mixer.blend(
        Visitor,
        created_by=first_user
    )
