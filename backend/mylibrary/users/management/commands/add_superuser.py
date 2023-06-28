import os

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand, CommandError


User = get_user_model()

username = os.getenv('ADMIN_USER', 'root')
password = os.getenv('ADMIN_PASSWORD', 'root')


class Command(BaseCommand):
    help = "Adds a superuser into database."

    def handle(self, *args, **options):

        if not User.objects.filter(username=username).exists():
            User.objects.create_superuser(
                username=username,
                password=password,
                email=''
            )
        else:
            raise CommandError('User "%s" is already exists' % username)
