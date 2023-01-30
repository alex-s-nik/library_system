from django.core.exceptions import ValidationError
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class ActionType(models.TextChoices):
    TAKE = 'TAKE', 'Взял на руки'
    RETURN = 'RETURN', 'Вернул в библиотеку'


class BaseCreatedByAndAt(models.Model):
    created_by = models.ForeignKey(
        verbose_name='Пользователь, создавший объект',
        to=User,
        on_delete=models.DO_NOTHING,
        related_name="created_%(class)ss",
    )
    created_at = models.DateTimeField(
        verbose_name='Дата и время создания',
        auto_now_add=True,
    )

    class Meta:
        abstract = True


class Visitor(BaseCreatedByAndAt):
    '''Читатель/посетитель библиотеки'''
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
    '''Экземпляр библиотечного фонда'''
    title = models.CharField(
        verbose_name='Название книги',
        max_length=200,
    )
    description = models.CharField(
        verbose_name='Описание и другие заметки об экземпляре',
        max_length=500,
    )

    @property
    def in_library(self) -> bool:
        '''
        Статус книги:
        - True: книга в библиотеке
        - False: книга на руках

        В библиотеке она может быть, если до этого с ней
        не производилось никаких действий. Либо последнее
        действие было "возврат" книги читателем
        На руках она может быть только в случае последнего 
        действия "выдачи" на руки.
        '''    
        history_records_with_this_book = History.objects.filter(
            book=self
        ).order_by('-created_at').first()
        if not history_records_with_this_book:
            return True
        return history_records_with_this_book.action_type == ActionType.RETURN

    def __str__(self):
        return f'{self.title}'

    class Meta:
        verbose_name = 'Книга'
        verbose_name_plural = 'Книги'


class History(BaseCreatedByAndAt):
    '''Действия над экзеплярами фонда'''
    visitor = models.ForeignKey(
        verbose_name='Посетитель, с которым связано действие',
        to=Visitor,
        on_delete=models.DO_NOTHING,
        related_name='history'
    )
    book = models.ForeignKey(
        verbose_name='Книга, над которой произведено действие',
        to=Book,
        on_delete=models.DO_NOTHING,
        related_name='history'
    )
    action_type = models.CharField(
        verbose_name='Действие',
        max_length=6,
        choices=ActionType.choices
    )

    def save(self, *args, **kwargs):
        '''
        Валидация:
        1. Если книга выдается (TAKE) и последняя запись о книге была о выдаче -> exception
        2. Если книга возвращается (RETURN) и последняя запись о книге была о возврате или
           записей о книге вообще не было -> exception
        3. Если книга возвращается (RETURN) и возвращает не тот, кто ее брал
        '''
        last_book_record = History.objects.filter(book=self.book).order_by('-created_at').first()
        if (
            last_book_record and last_book_record.action_type == ActionType.TAKE and 
            self.action_type == ActionType.TAKE
        ):
            raise ValidationError('Книга уже выдана')
        elif (
            (not last_book_record or last_book_record.action_type == ActionType.RETURN) and 
            self.action_type == ActionType.RETURN
        ):
            raise ValidationError('Книга еще не выдавалась')
        elif (
            last_book_record and
            last_book_record.action_type == ActionType.TAKE and
            last_book_record.visitor != self.visitor
        ):
            raise ValidationError('Книга возвращается не тем читателем, который ее сдал')
        super().save(*args, **kwargs)

    def __str__(self):
        return (
            f'{self.visitor} '
            f'{ActionType[self.action_type].label} '
            f'{self.book} '
            f'{self.created_at.strftime("%H:%M %Y-%m-%d")}'
        )

    class Meta:
        verbose_name = 'Действие'
        verbose_name_plural = 'Действия'
