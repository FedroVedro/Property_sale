import base64

from django.contrib.auth import get_user_model
from django.core.files.base import ContentFile
from rest_framework import serializers
from users.models import Role
from store.models import Property, Request, Bank, Notification



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

class PropertyListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = "__all__"

class ShortBankSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bank
        fields = "__all__"


class ShortUserSerializer(serializers.ModelSerializer):
    role = RoleSerializer(read_only=True)
    class Meta:
        model = User
        fields = ('id', 'email', 'rating', 'credit_score', 'role')
        
class ShortPropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = ('id', 'name', 'location', 'price', 'image_url')

class RequestListSerializer(serializers.ModelSerializer):
    buyer = ShortUserSerializer(read_only=True)
    seller = ShortUserSerializer(read_only=True)
    property = ShortPropertySerializer(read_only=True)
    bank = ShortBankSerializer(read_only=True)
    class Meta:
        model = Request
        fields = "__all__"


class ShortNotificationSerializer(serializers.ModelSerializer):
    sender = ShortUserSerializer(read_only=True)  # Для чтения данных
    recipient = ShortUserSerializer(read_only=True)  # Для чтения данных
    
    class Meta:
        model = Notification
        fields = ['id', 'sender', 'recipient', 'created_at', 'notification_type', 'message']
        read_only_fields = ['sender', 'created_at'] 

class CustomUserSerializer(serializers.ModelSerializer):
    role = RoleSerializer(read_only=True)  # Используется для чтения данных
    role_id = serializers.PrimaryKeyRelatedField(
        queryset=Role.objects.all(), write_only=True, source='role'
    )  # Используется для записи (принимает ID роли)
    created_properties = PropertyListSerializer(many=True, read_only=True)
    created_requests = RequestListSerializer(many=True, read_only=True, source='buyer')  # Добавляем связь с запросами
    accepted_requests = RequestListSerializer(many=True, read_only=True, source='seller')  # Добавляем связь с запросами
    notifications = ShortNotificationSerializer(many=True, read_only=True, source='recipient')
    
    class Meta:
        model = User
        fields = (
            'id', 
            'username', 
            'email', 
            'password',
            'role',
            'role_id',
            'created_properties',
            'created_requests',
            'accepted_requests', 
            'notifications'
            )
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        # Валидация автоматически преобразует `role_id` в объект Role
        return super().create(validated_data)

    def update(self, instance, validated_data):
        # Обновление данных пользователя
        if 'password' in validated_data:
            instance.set_password(validated_data.pop('password'))
        return super().update(instance, validated_data)


    
    
    
class PropertySerializer(serializers.ModelSerializer):
    seller = CustomUserSerializer(read_only=True)  # Для чтения данных
    seller_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), write_only=True, source='seller'
    )  # Для записи данных

    image_url = Base64ImageField()  # Для обработки изображений

    class Meta:
        model = Property
        fields = ['id', 'name', 'price', 'location', 'seller', 'seller_id', 'description', 'image_url']

    # def create(self, validated_data):
    #     # Создание объекта недвижимости
    #     return super().create(validated_data)

    # def update(self, instance, validated_data):
    #     # Обновление объекта недвижимости
    #     return super().update(instance, validated_data)


class BankSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bank
        fields = ['id', 'name']

class RequestSerializer(serializers.ModelSerializer):
    buyer = CustomUserSerializer(read_only=True)  # Для чтения данных
    buyer_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), write_only=True, source='buyer'
    )  # Для записи данных

    seller = CustomUserSerializer(read_only=True)
    seller_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), write_only=True, source='seller'
    )

    property = PropertySerializer(read_only=True)
    property_id = serializers.PrimaryKeyRelatedField(
        queryset=Property.objects.all(), write_only=True, source='property'
    )

    bank = BankSerializer(read_only=True)
    bank_id = serializers.PrimaryKeyRelatedField(
        queryset=Bank.objects.all(), write_only=True, source='bank'
    )

    class Meta:
        model = Request
        fields = [
            'id', 'buyer', 'buyer_id', 'seller', 'seller_id',
            'property', 'property_id', 'bank', 'bank_id',
            'status', 'date_submitted'
        ]

    def create(self, validated_data):
        # Автоматически связывает поля через PrimaryKeyRelatedField
        return super().create(validated_data)

    def update(self, instance, validated_data):
        # Обновление данных запроса
        return super().update(instance, validated_data)



class NotificationSerializer(serializers.ModelSerializer):
    sender = CustomUserSerializer(read_only=True)  # Для чтения данных
    sender_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), write_only=True, source='sender'
    ) 
    recipient = CustomUserSerializer(read_only=True)  # Для чтения данных
    recipient_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), write_only=True, source='recipient'
    ) 
    class Meta:
        model = Notification
        fields = ['id', 'sender', 'recipient', 'created_at', 'notification_type', 'message', 'sender_id', 'recipient_id']
        read_only_fields = ['sender', 'created_at'] 