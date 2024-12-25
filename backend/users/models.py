from django.db import models
from django.contrib.auth import get_user_model

# User = get_user_model()

# Create your models here.
# class Seller(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     raiting = models.FloatField(default=0)
#     class Meta:
#         verbose_name = 'Продавец'
#         verbose_name_plural = 'Продавцы'
#         ordering = ['raiting']
        
#     def __str__(self):
#         return self.user.username
    
    
    
    
    
# class Buyer(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     credit_score = models.IntegerField(default=0)
#     class Meta:
#         verbose_name = 'Покупатель'
#         verbose_name_plural = 'Покупатели'
#         ordering = ['credit_score']
        
#     def __str__(self):
#         return self.user.username
    
    
    
from django.contrib.auth.models import AbstractUser
from django.db import models



class Role(models.Model):
    name = models.CharField(max_length=100, unique=True)
    
    
    def __str__(self):
        return self.name
    

class User(AbstractUser):
    role = models.ForeignKey(
        Role,
        on_delete=models.SET_NULL,
        null=True
    )
        
    rating = models.FloatField(default=0)
    credit_score = models.IntegerField(default=0)


    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'

    def __str__(self):
        return self.username
    