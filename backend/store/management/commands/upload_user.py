import json
from tqdm import tqdm

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from users.models import Role

User = get_user_model()


class Command(BaseCommand):
    def handle(self, *args, **options):
        with open('data/users.json', encoding='utf-8') as data:
            for user in tqdm(json.loads(data.read())):
                new_user = User(
                    username=user['username'],
                    email=user['email'],
                    role=Role.objects.get(id=user['role'])
                )
                new_user.set_password(user['password'])
                new_user.save()