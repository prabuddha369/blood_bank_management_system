from django.contrib import admin
from .models import Profile

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'fullname', 'blood_group', 'phone_number', 'address', 'age', 'medical_history')
    search_fields = ('user__username', 'fullname', 'blood_group', 'phone_number')
    list_filter = ('blood_group', 'age')
