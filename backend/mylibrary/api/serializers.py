from rest_framework import serializers

from library.models import Visitor


class VisitorSerializer(serializers.ModelSerializer):
    created_by = serializers.SlugRelatedField(
        read_only = True,
        slug_field='username'
    )
    class Meta:
        model = Visitor
        fields = ('id', 'name', 'info', 'created_at', 'created_by')
