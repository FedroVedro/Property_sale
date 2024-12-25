from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from djoser.views import UserViewSet as DjoserViewSet
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import status, generics
from store import models
from api.v1 import paginators, permissions, serializers
from users.models import Role
from store.models import Property, Request, Bank, Notification

User = get_user_model()
# Create your views here.
class RoleViewSet(ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = serializers.RoleSerializer
    
    
class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = serializers.CustomUserSerializer
    pagination_class = paginators.PageNumberPagination
    
    
class PropertyViewSet(ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = serializers.PropertySerializer
    
    def list(self, request, *args, **kwargs):
        serializer = serializers.PropertyListSerializer(models.Property.objects.all(), many=True)
        return Response(serializer.data)
    



# Views для Bank
class BankViewSet(ModelViewSet):
    queryset = Bank.objects.all()
    serializer_class = serializers.BankSerializer



# Views для Request
class RequestViewSet(ModelViewSet):
    queryset = Request.objects.all()
    serializer_class = serializers.RequestSerializer


class NotificationViewSet(ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = serializers.NotificationSerializer

# class CreateNotificationView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         # Автоматически устанавливаем текущего пользователя как отправителя
#         serializer = serializers.NotificationSerializer(data=request.data, context={'request': request})
#         if serializer.is_valid():
#             serializer.save(sender=request.user)  # Передаем sender напрямую
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# # Список всех уведомлений текущего пользователя (получателя)
# class NotificationListView(ListAPIView):
#     serializer_class = serializers.NotificationSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         return serializers.Notification.objects.filter(recipient=self.request.user)

# # Детальное уведомление по ID
# class NotificationDetailView(RetrieveAPIView):
#     serializer_class = serializers.NotificationSerializer
#     permission_classes = [IsAuthenticated]
#     queryset = serializers.Notification.objects.all()

#     def get_queryset(self):
#         return super().get_queryset().filter(recipient=self.request.user)