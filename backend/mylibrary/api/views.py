from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from api.serializers import VisitorSerializer
from library.models import Visitor


class VisitorViewSet(viewsets.ModelViewSet):
    queryset = Visitor.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = VisitorSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
