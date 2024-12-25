from django.urls import include, path
from rest_framework.routers import DefaultRouter
from api.v1 import views

router = DefaultRouter()
router.register('roles', views.RoleViewSet, 'roles')
router.register('users', views.UserViewSet, 'users')
router.register('banks', views.BankViewSet, 'banks')
router.register('properties', views.PropertyViewSet, 'properties')
router.register('requests', views.RequestViewSet, 'requests')
router.register('notifications', views.NotificationViewSet, 'notifications')




urlpatterns = (
    path('', include(router.urls)),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
)
