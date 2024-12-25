from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.

User = get_user_model()

class Property(models.Model):
    name = models.CharField("Название", max_length=120)
    price = models.IntegerField("Цена")
    location = models.CharField("Местоположение",max_length=120)
    seller = models.ForeignKey(User,related_name="created_properties", on_delete=models.CASCADE)
    description = models.CharField("Описание",max_length=120)
    image_url = models.ImageField("Изображение",upload_to='images/properties/')

    def __str__(self):
        return self.name


class Bank(models.Model):
    name = models.CharField("Название банка",max_length=120)

    def __str__(self):
        return self.name


class Request(models.Model):
    buyer = models.ForeignKey(User, related_name="buyer", on_delete=models.CASCADE)
    seller = models.ForeignKey(User,related_name="seller", on_delete=models.CASCADE)
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    bank = models.ForeignKey(Bank, on_delete=models.CASCADE)
    status = models.CharField("Статус",max_length=120)
    date_submitted = models.DateTimeField("Дата одобрения")

    def __str__(self):
        return f"Request {self.id}: {self.status}"
    
class Notification(models.Model):
    sender = models.ForeignKey(
        User, related_name="sender", on_delete=models.CASCADE, null=False
    )
    recipient = models.ForeignKey(
        User, related_name="recipient", on_delete=models.CASCADE, null=False
    )
    created_at = models.DateTimeField(auto_now_add=True)
    notification_type = models.CharField(max_length=50)
    message = models.TextField()

    def __str__(self):
        return f"Notification from {self.sender} to {self.recipient}"
    