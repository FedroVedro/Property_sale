import json


from django.core.management.base import BaseCommand
from tqdm import tqdm
from django.contrib.auth import get_user_model
from store.models import Request, Property, Bank


User = get_user_model()

class Command(BaseCommand):
    def handle(self, *args, **options):
        with open('data/request.json', encoding='utf-8') as data:
            for request in tqdm(json.loads(data.read())):
                Request.objects.get_or_create(
                    seller = User.objects.get(id=request.pop('seller')),
                    buyer = User.objects.get(id=request.pop('buyer')),
                    property = Property.objects.get(id=request.pop('property')),
                    bank = Bank.objects.get(id=request.pop('bank')),
                    **request
                    )
                
                