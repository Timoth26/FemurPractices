from django.contrib import admin
from django.urls import path, include
from app import views
from rest_framework import routers
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('authentication.urls')),
]
