import json


from django.core.management.base import BaseCommand
from tqdm import tqdm
from django.contrib.auth import get_user_model
from store.models import Property

User = get_user_model()

class Command(BaseCommand):
    def handle(self, *args, **options):
        with open('data/property.json', encoding='utf-8') as data:
            for property in tqdm(json.loads(data.read())):
                Property.objects.get_or_create(seller = User.objects.get(id=property.pop('seller')),**property)