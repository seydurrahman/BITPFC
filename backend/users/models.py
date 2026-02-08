from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    ROLE_CHOICES = (
        ("admin", "Admin"),
        ("general", "General"),
    )

    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default="general")

    # Additional profile fields collected at registration
    phone = models.CharField(max_length=32, blank=True, null=True)
    organization = models.CharField(max_length=255, blank=True, null=True)
    nid = models.CharField(max_length=64, blank=True, null=True)
    gender = models.CharField(max_length=16, blank=True, null=True)
    blood_group = models.CharField(max_length=5, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    photography = models.FileField(upload_to="photos/", blank=True, null=True)
    occupation = models.CharField(max_length=255, blank=True, null=True)
    job_title = models.CharField(max_length=255, blank=True, null=True)
    company_name = models.CharField(max_length=255, blank=True, null=True)
    work_station = models.CharField(max_length=255, blank=True, null=True)
    job_category = models.CharField(max_length=64, blank=True, null=True)
    sector = models.CharField(max_length=128, blank=True, null=True)
    work_experience = models.CharField(max_length=64, blank=True, null=True)
    education_level = models.CharField(max_length=128, blank=True, null=True)
    institute = models.CharField(max_length=255, blank=True, null=True)
    passing_year = models.CharField(max_length=16, blank=True, null=True)
    linked_in_url = models.CharField(max_length=512, blank=True, null=True)
    skills = models.JSONField(blank=True, null=True, default=list)
    certifications = models.TextField(blank=True, null=True)
    membership_category = models.ForeignKey(
        "core.MembershipCategory",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
