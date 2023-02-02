from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from api.serializers import BookSerializer, VisitorSerializer
from library.models import Book, Visitor


class CreatedByMixin:
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class BookViewSet(CreatedByMixin, viewsets.ModelViewSet):
    queryset = Book.objects.all()
    permission_classes = (IsAuthenticated,) # need to chenge to librarian and admin
    serializer_class = BookSerializer

class VisitorViewSet(CreatedByMixin, viewsets.ModelViewSet):
    queryset = Visitor.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = VisitorSerializer
