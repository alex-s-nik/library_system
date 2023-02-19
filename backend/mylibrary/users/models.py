from django.db import models
from django.contrib.auth.models import AbstractUser

USER_ROLE = "user"
LIBRARIAN_ROLE = "librarian"
ADMIN_ROLE = "admin"

ROLE_CHOICES = (
    (USER_ROLE, "Пользователь"),
    (LIBRARIAN_ROLE, "Библиотекарь"),
    (ADMIN_ROLE, "Администратор"),
)


class User(AbstractUser):
    """
    Роль пользователя
    Обычный пользователь:
     - может создавать и редактировать события
     - может создавать и редактировать посетителей
    Библиотекарь - все, что и обычный пользователь, а так же:
     - может создавать и редактировать книги
    Администратор - суперпользователь
    """

    role = models.CharField(
        verbose_name="Роль пользователя",
        max_length=20,
        choices=ROLE_CHOICES,
        default=USER_ROLE,
    )

    @property
    def is_admin(self):
        return self.role == ADMIN_ROLE or self.is_superuser

    @property
    def is_librarian(self):
        return self.role == LIBRARIAN_ROLE

    @property
    def is_user(self):
        return self.role == USER_ROLE
