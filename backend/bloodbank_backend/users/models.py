from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    fullname = models.CharField(max_length=20)
    type = models.CharField(max_length=10)
    blood_group = models.CharField(max_length=4, blank=True, null=True)
    phone_number = models.CharField(max_length=15)
    address = models.CharField(max_length=255)
    age = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(120)], blank=True, null=True)
    medical_history = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.user.username
