from django.db import IntegrityError
from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from api.permissions import IsLibrarianAndAbove
from api.serializers import (
    BookSerializer,
    ReturnBookActionSerializer,
    TakenBookActionSerializer,
    VisitorSerializer,
)
from library.models import Book, Visitor
from library.services import return_book_to_library, take_book_to_visitor


class CreatedByMixin:
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class BookViewSet(CreatedByMixin, viewsets.ModelViewSet):
    queryset = Book.objects.all()
    permission_classes = (IsAuthenticated, IsLibrarianAndAbove)
    serializer_class = BookSerializer

    @action(
        detail=True,
        methods=["post"],
        permission_classes=(IsAuthenticated,),
        url_path="taken_by/(?P<visitor_id>[^/.]+)",
    )
    def taken_by(self, request, visitor_id, pk=None):
        book = get_object_or_404(Book, id=pk)
        visitor = get_object_or_404(Visitor, id=visitor_id)

        try:
            action = take_book_to_visitor(
                book=book,
                visitor=visitor,
                executor=request.user
            )
        except IntegrityError as e:
            return Response(
                data=str(e),
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(
            TakenBookActionSerializer(action).data,
            status=status.HTTP_201_CREATED
        )

    @action(
        detail=True,
        methods=('post',),
        permission_classes=(IsAuthenticated,)
    )
    def was_returned(self, request, pk=None):
        book = get_object_or_404(Book, id=pk)

        action = return_book_to_library(
            book=book,
            executor=request.user
        )

        return Response(
            ReturnBookActionSerializer(action).data,
            status=status.HTTP_201_CREATED
        )


class VisitorViewSet(CreatedByMixin, viewsets.ModelViewSet):
    queryset = Visitor.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = VisitorSerializer
