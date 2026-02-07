from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model
from django.utils.dateparse import parse_date


@csrf_exempt
def register(request):
    if request.method != "POST":
        return JsonResponse({"detail": "Method not allowed"}, status=405)

    # Support JSON body or multipart form data (for file upload)
    data = {}
    files = {}
    if request.content_type and request.content_type.startswith("multipart"):
        data = request.POST.dict()
        files = request.FILES
    else:
        try:
            import json

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

    # create user
    user = User.objects.create_user(username=username, email=email, password=password)

    # populate additional profile fields if present
    try:

        def set_if_present(field_name, transform=lambda x: x):
            v = data.get(field_name)
            if v is not None and v != "":
                setattr(user, field_name, transform(v))

        set_if_present("phone")
        set_if_present("organization")
        set_if_present("nid")
        set_if_present("gender")
        set_if_present("blood_group")
        # date_of_birth: expect YYYY-MM-DD
        dob = data.get("dateOfBirth") or data.get("date_of_birth")
        if dob:
            parsed = parse_date(dob)
            if parsed:
                user.date_of_birth = parsed
        set_if_present("occupation")
        set_if_present("job_title")
        set_if_present("company_name")
        set_if_present("work_station")
        set_if_present("job_category")
        set_if_present("sector")
        set_if_present("work_experience")
        set_if_present("education_level")
        set_if_present("institute")
        set_if_present("passing_year")
        set_if_present("linked_in_url")
        set_if_present("certifications")

        # skills: if JSON list or comma-separated string
        skills_val = data.get("skills")
        if skills_val:
            if isinstance(skills_val, str):
                import json as _json

                try:
                    parsed = _json.loads(skills_val)
                    if isinstance(parsed, list):
                        user.skills = parsed
                    else:
                        user.skills = [
                            s.strip() for s in skills_val.split(",") if s.strip()
                        ]
                except Exception:
                    user.skills = [
                        s.strip() for s in skills_val.split(",") if s.strip()
                    ]
            elif isinstance(skills_val, list):
                user.skills = skills_val

        # handle file upload
        photo = files.get("photography")
        if photo:
            user.photography = photo

        user.save()
    except Exception:
        # If saving extra fields fails, still return success for core user creation,
        # but log or return an error in real apps. Here return 500.
        return JsonResponse({"detail": "Failed saving profile fields"}, status=500)

    return JsonResponse({"message": "Registration successful"}, status=201)
