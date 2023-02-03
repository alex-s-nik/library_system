from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from api.permissions import IsLibrarianAndAbove
from api.serializers import BookSerializer, VisitorSerializer
from library.models import ActionType, Book, History, Visitor


class CreatedByMixin:
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class BookViewSet(CreatedByMixin, viewsets.ModelViewSet):
    queryset = Book.objects.all()
    permission_classes = (IsAuthenticated, IsLibrarianAndAbove)
    serializer_class = BookSerializer

    @action(
        detail = True,
        methods = ['post'],
        permission_classes = (IsAuthenticated,),
        url_path = 'taken_by/(?P<visitor_id>[^/.]+)'
    )
    def taken_by(self, request, visitor_id, id=None):
        book = get_object_or_404(Book, id=id)
        visitor = get_object_or_404(Visitor, id=visitor_id)
        # !!check if the book is already taken
        history = History.objects.create(
            visitor = visitor,
            book = book,
            action_type = ActionType.TAKE,
            created_by = request.user
        )
        history.save()
        return Response(..., status=status.HTTP_201_CREATED)
    
    @action(
        detail=True,
        methods=['post'],
        permission_classes = (IsAuthenticated,)
    )
    def was_returned(self, request, id=None):
        ...


class VisitorViewSet(CreatedByMixin, viewsets.ModelViewSet):
    queryset = Visitor.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = VisitorSerializer

    @action(
        detail=True,
        methods=['post'],
        permission_classes=(IsAuthenticated,)
    )
    def books(self, request, id=None):
        ...