from django.contrib import admin
from users import models

@admin.register(models.Role)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    list_filter = ('name',)

@admin.register(models.User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'id', 'role','rating', 'credit_score', 'email')
    list_filter = ('username',)