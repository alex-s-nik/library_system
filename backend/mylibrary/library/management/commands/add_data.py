import json
import random

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand, CommandError
from django.db import transaction

from library.models import Book, Visitor

User = get_user_model()


class Command(BaseCommand):
    help = "Adds a fake data into database."

    def handle(self, *args, **options):

        # add data about users
        json_users_file = 'fake_data/users.json'
        with open(json_users_file) as f:
            users_data = json.load(f)
        users = [User(**user_data) for user_data in users_data]

        # add data about visitors
        json_visitors_file = 'fake_data/visitors.json'
        with open(json_visitors_file) as f:
            visitors_data = json.load(f)
        visitors = []
        for visitor_data in visitors_data:
            visitor_data['created_by'] = random.choice(users)
            visitor = Visitor(**visitor_data)
            visitors.append(visitor)
        
        # add data about books
        json_books_file = 'fake_data/books.json'
        with open(json_books_file) as f:
            books_data = json.load(f)
        books = []
        for book_data in books_data:
            books_data['created_by'] = random.choice(users)
            book = Book(**book_data)
            books.append(book)

        with transaction.atomic():
            User.objects.bulk_create(users)
            Visitor.objects.bulk_create(visitors)
            Book.objects.bulk_create(books)
