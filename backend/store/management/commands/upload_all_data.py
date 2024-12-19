from django.core.management.base import BaseCommand

from store.management.commands import (
    upload_user, 
    upload_role,
    upload_property,
    upload_bank,
    upload_request
)


class Command(BaseCommand):
    def handle(self, *args, **options):
        upload_role.Command().handle()
        upload_user.Command().handle()
        upload_property.Command().handle()
        upload_bank.Command().handle()
        upload_request.Command().handle()
        