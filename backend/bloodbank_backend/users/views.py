from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from .models import Profile
import json
import random
from django.core.mail import send_mail
from django.conf import settings

@csrf_exempt
def send_verification_code(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            
            if not email:
                return JsonResponse({"status": "Error", "message": "Email is required"}, status=400)
     
            verification_code = random.randint(100000, 999999)
            
            request.session['verification_code'] = verification_code
            print("Stored Code",verification_code)
            send_mail(
                'Your Verification Code',
                f'Your verification code is {verification_code}.',
                'settings.EMAIL_HOST_USER',
                [email],
                fail_silently=False,
            )
            
            return JsonResponse({"status": "Success"}, status=200)
        
        except json.JSONDecodeError:
            return JsonResponse({"status": "Error", "message": "Invalid JSON"}, status=400)
        except Exception as e:
            return JsonResponse({"status": "Error", "message": str(e)}, status=500)
    else:
        return JsonResponse({"status": "Error", "message": "Invalid request method"}, status=405)
    


@csrf_exempt
def registerDonor(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            code = data.get('code')
            
            stored_code = request.session.get('verification_code')
            
            if not stored_code :
                return JsonResponse({"status": "Error", "message": "No verification code found"}, status=400)
            
            if code != str(stored_code):
                return JsonResponse({"status": "Error", "message": "Invalid verification code"}, status=400)
            
            if code == str(stored_code):
                username = data.get('email')
                password = data.get('password')
                fullname = data.get('name')
                user_type = data.get('type')
                blood_group = data.get('bloodGroup')
                phone_number = data.get('phoneNumber')
                address = data.get('address')
                age = data.get('age')
                medical_history = data.get('medicalHistory')

                if not username or not password:
                    return JsonResponse({"status": "Error", "message": "Username and password are required"}, status=400)

                user = User.objects.create_user(username=username, password=password)
                profile = Profile.objects.create(
                    user=user, 
                    fullname=fullname, 
                    type=user_type, 
                    blood_group=blood_group, 
                    phone_number=phone_number, 
                    address=address, 
                    age=age, 
                    medical_history=medical_history
                )

                return JsonResponse({"status": "Success", "user": {"username": user.username}}, status=201)
           
        except json.JSONDecodeError:
            return JsonResponse({"status": "Error", "message": "Invalid JSON"}, status=400)
        except Exception as e:
            return JsonResponse({"status": "Error", "message": str(e)}, status=500)
    else:
        return JsonResponse({"status": "Error", "message": "Invalid request method"}, status=405)

@csrf_exempt
def registerHospital(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            code = data.get('code')
            
            stored_code = request.session.get('verification_code')
            print("Stored Code", stored_code)
            
            if not stored_code:
                return JsonResponse({"status": "Error", "message": "No verification code found"}, status=400)
            
            if code != str(stored_code):
                return JsonResponse({"status": "Error", "message": "Invalid verification code"}, status=400)
            
            if code == str(stored_code):
                username = data.get('email')
                password = data.get('password')
                fullname = data.get('name')
                type = data.get('type')
                phone_number = data.get('phoneNumber')
                address = data.get('address')
                
                if not username or not password:
                    return JsonResponse({"status": "Error", "message": "Username and password are required"}, status=400)
                
                user = User.objects.create_user(username=username, password=password)
                profile = Profile.objects.create(user=user, fullname=fullname, type=type, phone_number=phone_number, address=address)
                
                return JsonResponse({"status": "Success", "user": {"username": user.username}}, status=201)
        
        except json.JSONDecodeError:
            return JsonResponse({"status": "Error", "message": "Invalid JSON"}, status=400)
        except Exception as e:
            return JsonResponse({"status": "Error", "message": str(e)}, status=500)
    else:
        return JsonResponse({"status": "Error", "message": "Invalid request method"}, status=405)

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('email')
        password = data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            try:
                profile = Profile.objects.get(user=user)
                user_type = profile.type
                user_name = profile.fullname
            except Profile.DoesNotExist:
                return JsonResponse({"status": "Profile not found"}, status=404)
            
            return JsonResponse({
                "status": "Login successful",
                "user_type": user_type,
                "user_name": user_name,
            })
        else:
            return JsonResponse({"status": "Invalid credentials"}, status=401)

@csrf_exempt
def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return JsonResponse({"status": "Logout successful"})

@csrf_exempt
@require_http_methods(["GET", "POST"])
def donor_data(request):
    if request.method == 'GET':
        donor_profiles = Profile.objects.filter(type='donor').values(
            'fullname',
            'blood_group',
            'phone_number',
            'address',
            'age',
            'medical_history'
        )
        data = list(donor_profiles)
        return JsonResponse(data, safe=False)

    elif request.method == 'POST':
        try:
            data = json.loads(request.body)

            fullname = data.get('fullname')
            blood_group = data.get('blood_group')
            phone_number = data.get('phone_number')
            address = data.get('address')
            age = data.get('age')
            medical_history = data.get('medical_history')

        
            existing_profile = Profile.objects.filter(user__username=data.get('username'), type='donor').first()

            if existing_profile:
           
                existing_profile.fullname = fullname
                existing_profile.blood_group = blood_group
                existing_profile.phone_number = phone_number
                existing_profile.address = address
                existing_profile.age = age
                existing_profile.medical_history = medical_history
                existing_profile.save()
            else:
           
                user = User.objects.get(username=data.get('username'))
                Profile.objects.create(
                    user=user,
                    fullname=fullname,
                    blood_group=blood_group,
                    phone_number=phone_number,
                    address=address,
                    age=age,
                    medical_history=medical_history,
                    type='donor'
                )

            return JsonResponse({"status": "Data saved successfully"}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)

        except User.DoesNotExist:
            return JsonResponse({"error": "User does not exist"}, status=404)

    return JsonResponse({"error": "Invalid request method"}, status=400)