from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class BaseCreatedByAndAt(models.Model):
    created_by = models.ForeignKey(
        verbose_name='Пользователь, создавший объект',
        to=User,
        on_delete=models.DO_NOTHING,
        related_name='created_%(class)ss',
    )
    created_at = models.DateTimeField(
        verbose_name='Дата и время создания',
        auto_now_add=True,
    )

    class Meta:
        abstract = True


class Visitor(BaseCreatedByAndAt):
    """Читатель/посетитель библиотеки"""

    name = models.CharField(
        verbose_name='Имя читателя',
        max_length=200,
    )
    info = models.CharField(
        verbose_name='Заметки и дополнительная информация о читателе',
        max_length=500,
    )

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Посетитель'
        verbose_name_plural = 'Посетители'


class Book(BaseCreatedByAndAt):
    """Экземпляр библиотечного фонда"""

    title = models.CharField(
        verbose_name='Название книги',
        max_length=200,
    )
    description = models.CharField(
        verbose_name='Описание и другие заметки об экземпляре',
        max_length=500,
    )
    in_library = models.BooleanField(
        verbose_name='Книга в библиотеке',
        default=True
    )

    def __str__(self):
        return f'{self.title}'

    class Meta:
        verbose_name = 'Книга'
        verbose_name_plural = 'Книги'


class Action(models.Model):
    """Действия над экзеплярами фонда"""

    book = models.ForeignKey(
        verbose_name='Книга, с которой связано действие',
        to=Book,
        on_delete=models.DO_NOTHING,
        related_name='actions',
    )
    visitor = models.ForeignKey(
        verbose_name='Посетитель, с которым связано действие',
        to=Visitor,
        on_delete=models.DO_NOTHING,
        related_name='actions',
    )
    taken_date = models.DateTimeField(
        verbose_name='Дата и время выдачи',
        auto_now_add=True
    )
    return_date = models.DateTimeField(
        verbose_name='Дата и время возврата',
        null=True,
    )
    taken_by = models.ForeignKey(
        verbose_name='Пользователь, выдавший книгу',
        to=User,
        on_delete=models.DO_NOTHING,
        related_name='taken_actions',
    )
    returned_by = models.ForeignKey(
        verbose_name='Пользователь, принявший книгу обратно',
        to=User,
        on_delete=models.DO_NOTHING,
        related_name='returned_actions',
        null=True,
    )

    def save(self, *args, **kwargs):
        book = self.book
        # если поле даты возврата пусто - значит книгу выдают
        # иначе - книгу возвращают
        book.in_library = bool(self.return_date)
        book.save()
        super().save(*args, **kwargs)
        

    def __str__(self):
        return (
            f'{self.visitor} '
            f'take book '
            f'{self.book} '
            f'at {self.taken_date.strftime("%H:%M %Y-%m-%d")}'
            ' and returned at'
            f'{self.return_date.strftime("%H:%M %Y-%m-%d") if self.return_date else "ever yet"}'
        )

    class Meta:
        verbose_name = 'Действие'
        verbose_name_plural = 'Действия'
