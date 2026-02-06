from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model
import json


@csrf_exempt
def register(request):
    if request.method != "POST":
        return JsonResponse({"detail": "Method not allowed"}, status=405)
    try:
        data = json.loads(request.body.decode("utf-8"))
    except Exception:
        return JsonResponse({"detail": "Invalid JSON"}, status=400)

    email = data.get("email")
    password = data.get("password")
    username = data.get("username") or email

    if not email or not password:
        return JsonResponse({"detail": "Email and password are required"}, status=400)

    User = get_user_model()
    if User.objects.filter(email=email).exists():
        return JsonResponse({"detail": "Email already registered"}, status=400)

    user = User.objects.create_user(username=username, email=email, password=password)
    # Optionally store phone/organization in a profile model. Skipping for now.

    return JsonResponse({"message": "Registration successful"}, status=201)
