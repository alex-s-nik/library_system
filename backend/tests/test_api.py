import pytest
from rest_framework import status

from library.models import Visitor

class TestAPIMainModels:
    @pytest.mark.django_db(transaction=True)
    def test_unexisting_visitor(self):
        # найдем самый первый id, объекта с которым нет в БД
        curr_id = 1
        while Visitor.objects.filter(id=curr_id).exists():
            curr_id += 1
        
        # TODO: доделать и перенести в test_with_user

    @pytest.mark.django_db(transaction=True)
    def test_visitor_with_anonymous(self, client, visitor1):
        status_code_for_unathorized = status.HTTP_401_UNAUTHORIZED
        response = client.get(
            '/api/v1/visitors/'
        )

        assert response.status_code == status_code_for_unathorized, (
            'Статус код при анонимном get-запросе отличается от требуемого'
        )

        exist_visitor_id = visitor1.id
        response = client.get(
            f'/api/v1/visitors/{exist_visitor_id}/'
        )
        assert response.status_code == status_code_for_unathorized, (
            'Статус статус при анонимном get-запросе по id отличается от требуемого'
        )

        visitor_name = 'test_user'
        visitor_info = 'test_info_user'

        visitor_count_before_requset = Visitor.objects.count()

        response = client.post(
            '/api/v1/visitors/',
            data={
                'name': visitor_name,
                'info': visitor_info
            }
        )

        assert response.status_code == status_code_for_unathorized, (
            'Статус код при анонимном post-запросе отличается от требуемого'
        )

        visitor_count_after_requset = Visitor.objects.count()

        assert visitor_count_before_requset == visitor_count_after_requset, (
            'В результате анонимного post-запроса изменилось количество записей в БД'
        )

        response = client.patch(
            f'/api/v1/visitors/{exist_visitor_id}/',
            data={
                'name': visitor_name,
                'info': visitor_info
            }
        )

        assert response.status_code == status_code_for_unathorized, (
            'Статус код при анонимном update-запросе отличается от требуемого'
        )

        assert Visitor.objects.filter(
            name=visitor_name,
            info=visitor_info
        ).count() == 0, 'В результате update-запроса появились записи с измененными данными'

        visitor_count_before_requset = Visitor.objects.count()

        response = client.delete(
            f'/api/v1/visitors/{exist_visitor_id}/'
        )

        visitor_count_after_requset = Visitor.objects.count()

        assert response.status_code == status_code_for_unathorized, (
            'Статус код при анонимном delete-запросе отличается от требуемого'
        )

        assert visitor_count_before_requset == visitor_count_after_requset, (
            'В результате анонимного delete-запроса изменилось количество записей в БД'
        )


    def test_visitor_with_user(self, first_user_client):
        pass


    def test_book(self):
        pass


class TestAPIActions:
    def test_taking_book(self):
        pass

    def test_returning_book(self):
        pass
