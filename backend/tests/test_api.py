import pytest
from rest_framework import status

from library.models import Visitor

class TestAPIMainModels:
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
        visitor_name = 'test_user'
        visitor_info = 'test_info_user'

        # создание посетителя
        visitor_count_before_requset = Visitor.objects.count()

        response = first_user_client.post(
            '/api/v1/visitors/',
            data={
                'name': visitor_name,
                'info': visitor_info
            }
        )

        visitor_count_after_requset = Visitor.objects.count()

        assert response.status_code == status.HTTP_201_CREATED, (
            'Статус код при post-запросе отличается от требуемого'
        )

        assert visitor_count_before_requset != visitor_count_after_requset, (
            'В результате post-запроса не изменилось количество записей в БД'
        )

        assert Visitor.objects.filter(
            name=visitor_name,
            info=visitor_info
        ).count() == 1, 'В результате post-запроса не появились записи с созданными данными'

        # запрос всех посетителей
        response = first_user_client.get('/api/v1/visitors/')

        assert response.status_code == status.HTTP_200_OK, (
            'Статус код при get-запросе отличается от требуемого'
        )

        test_data = response.json()

        assert type(test_data) == list, (
            'Проверьте, что при GET запросе на `/api/v1/visitors/` возвращается список'
        )

        assert len(test_data) == Visitor.objects.count(), (
            'Проверьте, что при GET запросе на `/api/v1/visitors/` возвращается весь список статей'
        )

        visitor = Visitor.objects.all()[0]
        test_visitor = test_data[0]
        assert 'id' in test_visitor, (
            'Проверьте, что добавили `id` в список полей `fields` сериализатора модели Visitor'
        )
        assert 'name' in test_visitor, (
            'Проверьте, что добавили `name` в список полей `fields` сериализатора модели Visitor'
        )
        assert 'info' in test_visitor, (
            'Проверьте, что добавили `info` в список полей `fields` сериализатора модели Visitor'
        )

        # запрос конкретного посетителя
        response = first_user_client.get(f'/api/v1/visitors/{visitor.id}/')

        assert response.status_code == status.HTTP_200_OK, (
            'Статус код при get-запросе по id отличается от требуемого'
        )

        test_data = response.json()
        assert 'id' in test_visitor, (
            'Проверьте, что добавили `id` в список полей `fields` сериализатора модели Visitor'
        )
        assert 'name' in test_visitor, (
            'Проверьте, что добавили `name` в список полей `fields` сериализатора модели Visitor'
        )
        assert 'info' in test_visitor, (
            'Проверьте, что добавили `info` в список полей `fields` сериализатора модели Visitor'
        )

        # запрос несуществующего посетителя
        # найдем самый первый id, объекта с которым нет в БД
        curr_id = 1
        while Visitor.objects.filter(id=curr_id).exists():
            curr_id += 1
        
        response = first_user_client.get(f'/api/v1/visitors/{curr_id}/')

        assert response.status_code == status.HTTP_404_NOT_FOUND, (
            'Статус код при get-запросе по несуществующему id отличается от требуемого'
        )

        # изменение существующего посетителя
        visitor = Visitor.objects.first()
        invalid_data = {}

        response = first_user_client.patch(
            f'/api/v1/visitors/{visitor.id}/',
            data=invalid_data
        )

        assert response.status_code == status.HTTP_400_BAD_REQUEST, (
            'Статус код при patch-запросе с невалидными данными отличается от требуемого'
        )

        test_name = 'valid_name'
        test_info = 'valid_info'
        valid_data = {
            'name': test_name,
            'info': test_info
        }

        response = first_user_client.patch(
            f'/api/v1/visitors/{visitor.id}/',
            data=valid_data
        )

        assert response.status_code == status.HTTP_200_OK, (
            'Статус код при patch-запросе с валидными данными отличается от требуемого'
        )

        # TODO: удаление будет реализовано позже


    def test_book(self):
        pass


class TestAPIActions:
    def test_taking_book(self):
        pass

    def test_returning_book(self):
        pass
