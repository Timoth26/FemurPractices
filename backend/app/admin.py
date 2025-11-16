from django.contrib import admin
from .models import Offer
class OfferAdmin(admin.ModelAdmin):
    model = Offer

admin.site.register(Offer)