import json


from django.core.management.base import BaseCommand
from tqdm import tqdm

from users.models import Role

class Command(BaseCommand):
    def handle(self, *args, **options):
        with open('data/roles.json', encoding='utf-8') as data:
            for role in tqdm(json.loads(data.read())):
                Role.objects.get_or_create(**role)