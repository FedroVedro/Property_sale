import base64

from django.contrib.auth import get_user_model
from django.core.files.base import ContentFile
from rest_framework import serializers
from users.models import Role
from store.models import Property, Request, Bank



User = get_user_model()


class Base64ImageField(serializers.ImageField):
    def to_internal_value(self, data):
        if isinstance(data, str) and data.startswith('data:image'):
            image_format, image = data.split(';base64,')
            ext = image_format.split('/')[-1]
            data = ContentFile(base64.b64decode(image), name='temp.' + ext)
        return super().to_internal_value(data)






    
class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ('id', 'name')
        extra_kwargs = {
            'name': {'required': False, 'allow_null': True}
        }



class CustomUserSerializer(serializers.ModelSerializer):
    role = RoleSerializer()
    
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'role')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        role_data = validated_data.pop('role')
        
        user = User(
            role=Role.objects.get(id=role_data),
            **validated_data
        )
        user.set_password(validated_data['password'])
        user.save()
        return user    
    
    
    
class PropertySerializer(serializers.ModelSerializer):
    image_url = Base64ImageField()
    seller = CustomUserSerializer()
    class Meta:
        model = Property
        fields = ['id', 'name', 'price', 'location', 'seller', 'description', 'image_url']

class BankSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bank
        fields = ['id', 'name']

class RequestSerializer(serializers.ModelSerializer):
    buyer = CustomUserSerializer()
    seller = CustomUserSerializer()
    property = PropertySerializer()
    bank = BankSerializer()
    class Meta:
        model = Request
        fields = [
            'id', 'buyer', 'seller', 'property',
            'bank', 'status', 'date_submitted'
        ]