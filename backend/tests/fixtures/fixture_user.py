import pytest


@pytest.fixture
def first_user(django_user_model):
    return django_user_model.objects.create_user(
        username='TestUser1',
        password='1',
        email='testuser1@passage.fake'
    )
