from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from .serializers import PrivateUserSerializer, CompanyUserSerializer

from .serializers import MyTokenObtainPairSerializer

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class BaseUserCreate(CreateAPIView):

    serializer_class = PrivateUserSerializer
    permission_classes = (permissions.AllowAny,)

    def create(self, request, *args, **kwargs):
        user_type = request.data.get('type', '').lower()

        if user_type == 'private':
            serializer = PrivateUserSerializer(data=request.data)
        elif user_type == 'company':
            serializer = CompanyUserSerializer(data=request.data)
        else:
            return Response({"error": "Invalid user type"}, status=status.HTTP_400_BAD_REQUEST)

        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)