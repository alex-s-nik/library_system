from django.core.exceptions import ValidationError as DjangoValidationError
from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError as DRFValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from api.permissions import IsLibrarianAndAbove
from api.serializers import BookSerializer, HistorySerializer, VisitorSerializer
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
        serializer_class = HistorySerializer,
        url_path = 'taken_by/(?P<visitor_id>[^/.]+)'
    )
    def taken_by(self, request, visitor_id, pk=None):
        book = get_object_or_404(Book, id=pk)
        visitor = get_object_or_404(Visitor, id=visitor_id)
        try:
            history = History.objects.create(
                visitor = visitor,
                book = book,
                action_type = ActionType.TAKE,
                created_by = request.user
            )
            return Response(HistorySerializer(history).data, status=status.HTTP_201_CREATED)
        except DjangoValidationError as e:
            raise DRFValidationError(*e)
    
    @action(
        detail=True,
        methods=['post'],
        permission_classes = (IsAuthenticated,)
    )
    def was_returned(self, request, pk=None):
        book = get_object_or_404(Book, id=pk)
        # find the book in history which has status 'take' and has the latest date of taken
        # select h.*
        # from (
        #   select book_id, max(created_at) as last_action_time
        #   from history
        #   group by book_id
        # ) b
        # inner join history h on h.book_id=b.book_id and h.created_at=b.last_action_time
        # where h.action_type=TAKE

        # select book_id, max(created_at) as last_action_time
        # from history
        # group by book_id
        # 
        # from django.db.models import Max
        # h = History.objects.values('book').annotate(last_action_time=Max('created_at')).filter(action_type=ActionType.TAKE)

        # queryset = Book.objects.all()
        # queryset.annotate(
        #   in_library=Case(
        #       When(id__in=h, then=Value('False')),
        #       default=Value('True')
        #   )
        # ).filter(in_library=True)




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