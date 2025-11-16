from django.db import models
from authentication.models import PrivateUser, CompanyUser

class Offer(models.Model):
    name = models.CharField(max_length=200, null=False, blank=False)
    city = models.CharField(max_length=60, null=False, blank=False)
    region = models.CharField(max_length=60, null=False, blank=False)
    sector = models.CharField(max_length=60, null=False, blank=False)
    start_date = models.DateField(null=True, blank=True)
    duration = models.CharField(null=False, blank=False)
    nfz = models.BooleanField(default=False, null=False, blank=False)
    status = models.CharField(null=False, blank=False, default="Zakończona")
    about = models.TextField(blank=True, null=True)
    address = models.CharField(blank=True, null=True)
    paid = models.BooleanField(default=False, null=False, blank=False)
    users = models.ManyToManyField(PrivateUser, blank=True)
    owner = models.ForeignKey(CompanyUser, on_delete=models.CASCADE, default=None)

    def __str__(self):
        return self.name