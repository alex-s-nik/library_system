import pytest


@pytest.fixture
def first_user(django_user_model):
    return django_user_model.objects.create_user(
        username='TestUser1',
        password='1',
        email='testuser1@passage.fake'
    )


@pytest.fixture
def token_first_user(first_user):
    from rest_framework.authtoken.models import Token
    token, _ = Token.objects.get_or_create(user=first_user)
    return token

@pytest.fixture
def first_user_client(token_first_user):
    from rest_framework.test import APIClient

    client = APIClient()
    client.credentials(HTTP_AUTHORIZATION=f'Token {token_first_user}')
    return client
