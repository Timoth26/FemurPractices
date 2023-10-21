from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import MyTokenObtainPairView, BaseUserCreate

urlpatterns = [
    path('user/create/', BaseUserCreate.as_view(), name="create_user"),
    path('token/', MyTokenObtainPairView.as_view(), name='token_create'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]