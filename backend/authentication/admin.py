from django.contrib import admin
from django.utils.html import format_html
from django.http import FileResponse
from .models import BaseUser, PrivateUser, CompanyUser

class BaseUserAdmin(admin.ModelAdmin):
    model = BaseUser

class PrivateUserAdmin(admin.ModelAdmin):
    model = PrivateUser
    list_display = ('email', 'download_resume')

    # https://stackoverflow.com/questions/51492206/how-can-i-add-a-link-to-download-a-file-in-a-django-admin-detail-page

    def download_resume(self, obj):
        if obj.resume:
            return format_html('<a href="{}" download="{}">Download resume</a>', obj.resume.url, self.get_resume_filename(obj.resume))
        else:
            return "No resume"

    download_resume.short_description = 'Download resume'

    readonly_fields = ['download_resume_link']

    def download_resume_link(self, obj):
        if obj.resume:
            return format_html('<a href="{}" download="{}">Download resume</a>', obj.resume.url, self.get_resume_filename(obj.resume))
        else:
            return "No resume"

    download_resume_link.short_description = 'resume'

    def get_resume_filename(self, resume):
        return resume.name.split('/')[-1]

admin.site.register(BaseUser, BaseUserAdmin)
admin.site.register(PrivateUser, PrivateUserAdmin)
admin.site.register(CompanyUser)
