import pytest
import datetime

from django.core.exceptions import ValidationError

from library.models import ActionType, Book, History, Visitor


class TestBook:
    @pytest.mark.django_db(transaction=True)
    def test_book_create(self, first_user):
        test_book_data = {
            'title' : 'TestTitle1',
            'description' : 'TestDescription1',
            'created_by': first_user
        }

        assert Book.objects.count() == 0

        book = Book.objects.create(**test_book_data)
        assert Book.objects.count() == 1
        assert Book.objects.get(**test_book_data).pk == book.pk

        assert book.in_library, 'Статус у только что созданной книги - не в библиотеке'


class TestVisitor:
    @pytest.mark.django_db(transaction=True)
    def test_visitor_create(self, first_user):
        test_visitor_data = {
            'name' : 'TestName1',
            'info' : 'TestInfo1',
            'created_by': first_user
        }

        assert Visitor.objects.count() == 0

        visitor = Visitor.objects.create(**test_visitor_data)
        assert Visitor.objects.count() == 1
        assert Visitor.objects.get(**test_visitor_data).pk == visitor.pk


class TestHistory:
    @pytest.mark.django_db(transaction=True)
    def test_history(self, monkeypatch, three_books, three_visitors, first_user):
        '''
        Мокаем время создания записей. Порядок действий важен. При автоматическом добавлении
        действия добавляются с одним временем и при сортировке события с одинаковым временем
        создания может поменять порядок. Как вариант решения добавить сортировку по id/pk
        в History.save()
        last_book_record = History.objects.filter(
            book=self.book
        ).order_by('-created_at', '-pk').first()
        '''
        def now_generator():
            start_time = datetime.datetime(2023, 1, 7, 15, 0, 0, 410163, tzinfo=datetime.timezone.utc)
            delta_time = datetime.timedelta(seconds=10)

            while True:
                start_time += delta_time
                yield start_time

        now = now_generator()

        def _mock_datetime_now():
            return next(now)
        
        monkeypatch.setattr('django.utils.timezone.now', _mock_datetime_now)

        assert History.objects.count() == 0

        # простое создание записи о взятии книги
        History.objects.create(
            visitor=three_visitors[0],
            book=three_books[0],
            action_type=ActionType.TAKE,
            created_by=first_user
        )

        assert History.objects.count() == 1
        
        # проверить статус книги. Она должна быть не в библиотеке
        assert three_books[0].in_library == False, 'Статус книги должен быть "не в библиотеке"'

        # попытаемся сделать запись о том, что 
        # посетитель пытается взять ту же самую книгу еще раз,
        # хотя она не была сдана на этот момент
        try:
            History.objects.create(
                visitor=three_visitors[0],
                book=three_books[0],
                action_type=ActionType.TAKE,
                created_by=first_user
            )
        except ValidationError:
            pass
        except Exception:
            assert False, 'Ошибка при повторном взятии уже выданной книги'

        assert History.objects.count() == 1, 'Можно повторно взять уже выданную книгу'

        # попытаемся сдать взятую книгу
        History.objects.create(
            visitor=three_visitors[0],
            book=three_books[0],
            created_by=first_user,
            action_type = ActionType.RETURN
        )

        assert History.objects.count() == 2, 'Взятую книгу невозможно сдать назад'

        # статус у книги должен быть "в библиотеке"
        assert three_books[0].in_library == True, 'Статус возвращенной книги остался "вне библиотеки"'

        # попытаемся сдать книгу, которую еще никогда не брали
        try:
            History.objects.create(
                visitor=three_visitors[0],
                book=three_books[1],
                created_by=first_user,
                action_type = ActionType.RETURN
            )
        except ValidationError:
            pass
        except Exception:
            assert False, 'Ошибка: возврат еше не выданной книги'

        assert History.objects.count() == 2, 'Можно вернуть еще не выданную книгу'
        assert three_books[1].in_library == True, 'Статус у книги при ошибочном возврате не должен меняться'

        # попытаемся сдать книгу которую уже брали и вернули назад
        try:
            History.objects.create(
                visitor=three_visitors[0],
                book=three_books[0],
                created_by=first_user,
                action_type = ActionType.RETURN
            )
        except ValidationError:
            pass
        except Exception:
            assert False, 'Ошибка: возврат еше не выданной книги'

        # пытаемся сдать книгу, которую до этого взял 
        # и не сдал назад другой посетитель
        History.objects.create(
            visitor=three_visitors[0],
            book=three_books[0],
            action_type=ActionType.TAKE,
            created_by=first_user
        )
        history_records_count = History.objects.count()

        try:
            History.objects.create(
                visitor=three_visitors[1],
                book=three_books[0],
                created_by=first_user,
                action_type = ActionType.RETURN
            )
        except ValidationError:
            pass
        
        assert History.objects.count() == history_records_count, 'Запись о том, что книгу сдал не тот, кто ее брал, была добавлена'

        # Перед общим тестом сдадим взятую книгу
        History.objects.create(
            visitor=three_visitors[0],
            book=three_books[0],
            action_type=ActionType.RETURN,
            created_by=first_user
        )
        assert History.objects.count() == history_records_count + 1, 'Запись о возврате книги перед общим тестом не была добавлена'
        history_records_count += 1

        # Возьмем тремя разными посетителями три книги и сдадим их в произвольном порядке
        # Например:
        # сначала посетитель0 берет книгу0,
        # затем посетитель1 берет книгу1,
        # затем посетитель0 сдает книгу0 и берет книгу2,
        # потом посетитель2 берет книгу0.
        # В конце все посетители сдают свои книги.
        # Должно добавиться 8 History objects.
        # Исключений быть не должно.
        # Все книги в конце должны иметь статус "в библиотеке".

        assert all(book.in_library for book in three_books), 'Не у всех книг стал статус "в библиотеке'
    
        # посетитель0 берет книгу0
        History.objects.create(
            visitor=three_visitors[0],
            book=three_books[0],
            action_type=ActionType.TAKE,
            created_by=first_user
        )
        # посетитель1 берет книгу1
        History.objects.create(
            visitor=three_visitors[1],
            book=three_books[1],
            action_type=ActionType.TAKE,
            created_by=first_user
        )
        # посетитель0 сдает книгу0
        History.objects.create(
            visitor=three_visitors[0],
            book=three_books[0],
            action_type=ActionType.RETURN,
            created_by=first_user
        )
        # посетитель0 берет книгу2
        History.objects.create(
            visitor=three_visitors[0],
            book=three_books[2],
            action_type=ActionType.TAKE,
            created_by=first_user
        )
        # посетитель2 берет книгу0
        History.objects.create(
            visitor=three_visitors[2],
            book=three_books[0],
            action_type=ActionType.TAKE,
            created_by=first_user
        )
        # посетитель1 сдает книгу1
        History.objects.create(
            visitor=three_visitors[1],
            book=three_books[1],
            action_type=ActionType.RETURN,
            created_by=first_user
        )
        # посетитель2 сдает книгу0
        History.objects.create(
            visitor=three_visitors[2],
            book=three_books[0],
            action_type=ActionType.RETURN,
            created_by=first_user
        )
        # посетитель0 сдает книгу2
        History.objects.create(
            visitor=three_visitors[0],
            book=three_books[2],
            action_type=ActionType.RETURN,
            created_by=first_user
        )

        assert History.objects.count() == history_records_count + 8, 'Не все события из восьми были добавлены'
        assert all(book.in_library for book in three_books), 'Не у всех книг стал статус "в библиотеке'
