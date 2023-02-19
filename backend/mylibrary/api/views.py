from django.core.exceptions import ValidationError as DjangoValidationError, ObjectDoesNotExist
from django.db.models import F, Max, OuterRef, Subquery
from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError as DRFValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from api.permissions import IsLibrarianAndAbove
from api.serializers import BookSerializer, HistorySerializer, VisitorSerializer, VisitorDebtSerializer
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

        history_with_last_taken_books = History.objects.filter(
            created_at=Subquery(
                History.objects.filter(
                    book=OuterRef('book')
                ).values('book').annotate(
                    max_date=Max('created_at')
            ).values('max_date')[:1])
        ).filter(action_type=ActionType.TAKE)

        try:
            record_with_current_book = history_with_last_taken_books.get(
                book=book
            )
        # Book is in library, not taken
        except ObjectDoesNotExist:
            raise DRFValidationError('Книга еще не выдавалась.')

        
        visitor = record_with_current_book.visitor
        history_obj = History.objects.create(
            book=book,
            visitor=visitor,
            action_type=ActionType.RETURN,
            created_by=request.user
        )
        return Response(HistorySerializer(history_obj).data, status=status.HTTP_201_CREATED)





class VisitorViewSet(CreatedByMixin, viewsets.ModelViewSet):
    queryset = Visitor.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = VisitorSerializer

    @action(
        detail=True,
        methods=['get'],
        permission_classes=(IsAuthenticated,)
    )
    def books(self, request, pk=None):
        history_with_last_taken_books = History.objects.filter(
            created_at=Subquery(
                History.objects.filter(
                    book=OuterRef('book')
                ).values('book').annotate(
                    max_date=Max('created_at')
            ).values('max_date')[:1])
        ).filter(action_type=ActionType.TAKE)

        books_taken_by_visitor = Book.objects.filter(
            id__in=history_with_last_taken_books.filter(visitor=pk).values('book')
        ).annotate(
            taken_at=F('history__created_at')
        )
        return Response(
            VisitorDebtSerializer(
                {
                    'visitor': Visitor.objects.get(id=pk),
                    'books': books_taken_by_visitor
                }
            ).data, status=status.HTTP_200_OK
        )