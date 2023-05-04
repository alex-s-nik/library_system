from rest_framework import serializers

from library.models import Action, Book, Visitor


class BookSerializer(serializers.ModelSerializer):
    created_by = serializers.SlugRelatedField(read_only=True, slug_field="username")

    class Meta:
        model = Book
        fields = (
            "id",
            "title",
            "description",
            "in_library",
            "created_at",
            "created_by",
        )
        read_only_fields = ("in_library", "created_by")


class VisitorSerializer(serializers.ModelSerializer):
    created_by = serializers.SlugRelatedField(read_only=True, slug_field="username")

    class Meta:
        model = Visitor
        fields = ("id", "name", "info", "created_at", "created_by")


class BookWithActionDateSerializer(serializers.ModelSerializer):
    created_by = serializers.SlugRelatedField(read_only=True, slug_field="username")
    taken_at = serializers.SerializerMethodField()

    def get_taken_at(self, obj):
        return obj.taken_at

    class Meta:
        model = Book
        fields = (
            "id",
            "title",
            "description",
            "in_library",
            "created_at",
            "created_by",
            "taken_at",
        )
        read_only_fields = ("in_library", "created_by", "taken_at")

class ActionSerializer(serializers.ModelSerializer):
    visitor = VisitorSerializer(read_only=True)
    books = BookSerializer(read_only=True)
    action = serializers.SerializerMethodField()
    created = serializers.SlugRelatedField(read_only=True, slug_field='username', source='taken_by')
    datetime = serializers.SerializerMethodField()

    def get_action(self, obj):
        raise NotImplementedError('Action is unknown')
    
    def get_datetime(self, obj):
        raise NotImplementedError


class TakenBookActionSerializer(serializers.ModelSerializer):
    visitor = VisitorSerializer(read_only=True)
    book = BookSerializer(read_only=True)
    taken_by = serializers.SlugRelatedField(read_only=True, slug_field='username')
    datetime = serializers.CharField(read_only=True, source='taken_date')
    action = serializers.SerializerMethodField(read_only=True)

    def get_action(self, obj):
        return 'take book'

    class Meta:
        model = Action
        fields = (
            'visitor',
            'book',
            'action',
            'taken_by',
            'datetime',
            'action'
        )
        read_only_fields = ('taken_by', 'datetime')

class ReturnBookActionSerializer(serializers.ModelSerializer):
    visitor = VisitorSerializer(read_only=True)
    book = BookSerializer(read_only=True)
    return_by = serializers.SlugRelatedField(read_only=True, slug_field='username')
    datetime = serializers.CharField(source='return_date')
    action = serializers.SerializerMethodField(read_only=True)

    def get_action(self, obj):
        return 'return book'

    class Meta:
        model = Action
        fields = (
            'visitor',
            'book',
            'return_by',
            'datetime',
            'action'
        )
        read_only_fields = ('return_by', 'datetime')

class VisitorDebtSerializer(serializers.Serializer):
    visitor = VisitorSerializer(read_only=True)
    books = BookWithActionDateSerializer(many=True, read_only=True)
