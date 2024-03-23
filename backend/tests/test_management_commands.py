import pytest

from django.contrib.auth import get_user_model
from django.core.management import call_command

User = get_user_model()


class ManagementCommandsTest:
    @pytest.mark.django_db
    def test_add_su():
        number_of_sus = User.objects.filter(is_superuser=True).count()
        call_command("add_superuser")

        assert User.objects.filter(
            is_superuser=True
        ).count() == number_of_sus + 1, (
            "Superuser has not been created"
        )
