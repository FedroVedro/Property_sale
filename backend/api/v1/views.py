from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from djoser.views import UserViewSet as DjoserViewSet
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from rest_framework import status, generics

from api.v1 import paginators, permissions, serializers
from users.models import Role
from store.models import Property, Request, Bank

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



# Views для Bank
class BankViewSet(ModelViewSet):
    queryset = Bank.objects.all()
    serializer_class = serializers.BankSerializer



# Views для Request
class RequestViewSet(ModelViewSet):
    queryset = Request.objects.all()
    serializer_class = serializers.RequestSerializer

