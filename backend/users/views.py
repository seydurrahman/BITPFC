from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model
from django.utils.dateparse import parse_date
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from core.models import MembershipCategory
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model


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

        # membership_category: accept id or name
        cat_val = data.get("membership_category") or data.get("category")
        if cat_val:
            try:
                # try numeric id first
                mc = None
                try:
                    mc = MembershipCategory.objects.get(pk=int(cat_val))
                except Exception:
                    mc = MembershipCategory.objects.filter(name__iexact=cat_val).first()

                if mc:
                    user.membership_category = mc
            except Exception:
                # ignore invalid category
                pass

        user.save()
    except Exception:
        # If saving extra fields fails, still return success for core user creation,
        # but log or return an error in real apps. Here return 500.
        return JsonResponse({"detail": "Failed saving profile fields"}, status=500)

    return JsonResponse({"message": "Registration successful"}, status=201)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def users_list(request):
    # only staff/admins can list users
    if not (request.user.is_staff or request.user.is_superuser):
        return Response({"detail": "Not authorized"}, status=status.HTTP_403_FORBIDDEN)

    User = get_user_model()
    qs = User.objects.all().order_by("-id")
    results = []
    for u in qs:
        mc = None
        try:
            if getattr(u, "membership_category", None):
                mc = {
                    "id": u.membership_category.id,
                    "name": u.membership_category.name,
                }
        except Exception:
            mc = None

        results.append(
            {
                "id": u.id,
                "username": u.username,
                "first_name": u.first_name,
                "last_name": u.last_name,
                "phone": u.phone,
                "date_joined": u.date_joined,
                "is_active": u.is_active,
                "membership_category": mc,
            }
        )

    return Response(results, status=status.HTTP_200_OK)


@api_view(["GET", "PATCH", "DELETE"])
@permission_classes([IsAuthenticated])
def user_detail(request, pk):
    # only staff/admins can access/modify/delete users
    if not (request.user.is_staff or request.user.is_superuser):
        return Response({"detail": "Not authorized"}, status=status.HTTP_403_FORBIDDEN)

    User = get_user_model()
    user = get_object_or_404(User, pk=pk)

    if request.method == "GET":
        # return full user profile
        data = {
            "id": user.id,
            "username": user.username,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "phone": user.phone,
            "organization": user.organization,
            "nid": user.nid,
            "gender": user.gender,
            "blood_group": user.blood_group,
            "date_of_birth": user.date_of_birth,
            "occupation": user.occupation,
            "job_title": user.job_title,
            "company_name": user.company_name,
            "work_station": user.work_station,
            "job_category": user.job_category,
            "sector": user.sector,
            "work_experience": user.work_experience,
            "education_level": user.education_level,
            "institute": user.institute,
            "passing_year": user.passing_year,
            "linked_in_url": user.linked_in_url,
            "skills": user.skills,
            "certifications": user.certifications,
            "is_active": user.is_active,
            "date_joined": user.date_joined,
        }

        # include photography URL if present
        try:
            if user.photography:
                data["photography"] = request.build_absolute_uri(user.photography.url)
        except Exception:
            pass

        # include membership category minimal info
        try:
            if getattr(user, "membership_category", None):
                data["membership_category"] = {
                    "id": user.membership_category.id,
                    "name": user.membership_category.name,
                }
        except Exception:
            data["membership_category"] = None

        return Response(data, status=status.HTTP_200_OK)

    if request.method == "PATCH":
        # Support multipart/form-data or JSON for updates
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
                return Response(
                    {"detail": "Invalid JSON"}, status=status.HTTP_400_BAD_REQUEST
                )

        try:

            def set_if_present(field_name, transform=lambda x: x):
                v = data.get(field_name)
                if v is not None and v != "":
                    setattr(user, field_name, transform(v))

            # allow password change if provided
            pwd = data.get("password")
            if pwd:
                user.set_password(pwd)

            set_if_present("phone")
            set_if_present("organization")
            set_if_present("nid")
            set_if_present("gender")
            set_if_present("blood_group")
            dob = data.get("dateOfBirth") or data.get("date_of_birth")
            if dob:
                parsed = None
                try:
                    from django.utils.dateparse import parse_date

                    parsed = parse_date(dob)
                except Exception:
                    parsed = None
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

            # skills: accept JSON string or list
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

            # membership_category: accept id or name
            cat_val = data.get("membership_category") or data.get("category")
            if cat_val:
                try:
                    mc = None
                    try:
                        mc = MembershipCategory.objects.get(pk=int(cat_val))
                    except Exception:
                        mc = MembershipCategory.objects.filter(
                            name__iexact=cat_val
                        ).first()

                    if mc:
                        user.membership_category = mc
                except Exception:
                    pass

            user.save()
            return Response({"message": "Update successful"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"detail": "Failed saving profile fields", "error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    # DELETE
    user.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def current_user(request):
    user = request.user
    data = {
        "is_authenticated": True,
        "username": user.get_username(),
        "email": user.email,
        "is_staff": user.is_staff,
        "is_superuser": user.is_superuser,
        "role": getattr(user, "role", None),
        "is_admin": getattr(user, "is_staff", False)
        or getattr(user, "is_superuser", False)
        or (getattr(user, "role", None) == "admin"),
    }
    return Response(data, status=status.HTTP_200_OK)


class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Allow obtaining token with either username or email."""

    def validate(self, attrs):
        # The base serializer expects 'username' and 'password'. Accept 'email' as 'username'.
        username = attrs.get(self.username_field) or attrs.get("email")
        password = attrs.get("password")

        if username and "@" in username:
            User = get_user_model()
            try:
                user = User.objects.get(email__iexact=username)
                # set username field to the user's username so authenticate works
                attrs[self.username_field] = user.get_username()
            except User.DoesNotExist:
                # leave attrs as-is; authentication will fail below with a clear message
                pass

        return super().validate(attrs)


class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer
