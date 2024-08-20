from django.urls import path
from . import views

urlpatterns = [
    path('register/donor/', views.registerDonor, name='registerDonor'),
    path('register/hospital/', views.registerHospital, name='registerHospital'),
    path('send_code/', views.send_verification_code, name='send_verification_code'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('donor_data/', views.donor_data, name='donor_data'),
]
