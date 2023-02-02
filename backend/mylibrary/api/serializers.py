from rest_framework import serializers

from library.models import Book, Visitor


class BookSerializer(serializers.ModelSerializer):
    created_by = serializers.SlugRelatedField(
        read_only = True,
        slug_field='username'
    )
    class Meta:
        model = Book
        fields = ('id', 'title', 'description', 'in_library', 'created_at', 'created_by')
        read_only_fields = ('in_library', 'created_by')


class VisitorSerializer(serializers.ModelSerializer):
    created_by = serializers.SlugRelatedField(
        read_only = True,
        slug_field='username'
    )
    class Meta:
        model = Visitor
        fields = ('id', 'name', 'info', 'created_at', 'created_by')
