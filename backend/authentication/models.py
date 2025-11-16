from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        if not password:
            raise ValueError('The Password field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)

class BaseUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    type = models.CharField(default='private')
    address = models.CharField(max_length=60)
    city = models.CharField(max_length=60)
    region = models.CharField(max_length=60)
    postal_code = models.CharField(max_length=6)
    phone_nr = models.CharField(max_length=15)
    rules = models.BooleanField(default=True)
    privacy = models.BooleanField(default=True)
    trade = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['address', 'city', 'region', 'postal_code', 'phone_nr', 'rules', 'privacy', 'type']

    def __str__(self):
        return self.email

class PrivateUser(BaseUser):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    university = models.CharField(max_length=100, null=True, blank=True)
    subject = models.CharField(max_length=100, null=True, blank=True)
    index_nr =models.CharField(max_length=20, null=True, blank=True)
    semester = models.IntegerField(null=True, blank=True)
    end_year = models.IntegerField(null=True, blank=True)
    resume = models.FileField(upload_to='resumes/', null=True, blank=True)

    REQUIRED_FIELDS = ['first_name', 'last_name']

class CompanyUser(BaseUser):
    company_nr = models.CharField(max_length=20, null=True, blank=True)
    company_name = models.CharField(max_length=100)

    REQUIRED_FIELDS = ['company_name']
