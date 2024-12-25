import json


from django.core.management.base import BaseCommand
from tqdm import tqdm

from store.models import Bank

class Command(BaseCommand):
    def handle(self, *args, **options):
        with open('data/bank.json', encoding='utf-8') as data:
            for role in tqdm(json.loads(data.read())):
                Bank.objects.get_or_create(**role)