import pytest
import datetime

from django.core.exceptions import ValidationError


from library.models import Book, Visitor


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
