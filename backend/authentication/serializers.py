from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import PrivateUser, CompanyUser, BaseUser

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)

        token['confirmed'] = user.confirmed
        return token
    
class BaseUserSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(required=True)
    password = serializers.CharField(min_length=8, write_only=True, required=True)

    class Meta:
        model = BaseUser
        fields = ('email', 'password', 'street', 'city', 'region', 'postal_code', 'phone_nr', 'rules', 'privacy', 'type')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class PrivateUserSerializer(BaseUserSerializer):

    class Meta:
        model = PrivateUser
        fields = BaseUserSerializer.Meta.fields + ('first_name', 'last_name')
        extra_kwargs = BaseUserSerializer.Meta.extra_kwargs

class CompanyUserSerializer(BaseUserSerializer):

    class Meta:
        model = CompanyUser
        fields = BaseUserSerializer.Meta.fields + ('company_name',)
        extra_kwargs = BaseUserSerializer.Meta.extra_kwargs