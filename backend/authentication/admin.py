from django.contrib import admin
from .models import BaseUser, PrivateUser, CompanyUser
class BaseUserAdmin(admin.ModelAdmin):
    model = BaseUser

admin.site.register(BaseUser, BaseUserAdmin)
admin.site.register(PrivateUser)
admin.site.register(CompanyUser)