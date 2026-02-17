from django.db import models
from django.conf import settings

from io import BytesIO
from django.core.files.base import ContentFile
from PIL import Image
from django.utils import timezone


class Banner(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to="banners/")
    thumbnail = models.ImageField(
        upload_to="banners/thumbnails/", blank=True, null=True
    )
    is_active = models.BooleanField(default=True)
    vote = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        # Save original first so `image` has a file
        super().save(*args, **kwargs)

        if self.image:
            try:
                # open image from storage
                img = Image.open(self.image)
                img = img.convert("RGB")
                img.thumbnail((800, 400))
                thumb_io = BytesIO()
                img.save(thumb_io, format="JPEG", quality=85)
                thumb_name = f"thumb_{self.image.name.split('/')[-1].split('\\\\')[-1]}"
                self.thumbnail.save(
                    thumb_name, ContentFile(thumb_io.getvalue()), save=False
                )
                super().save(update_fields=["thumbnail"])
            except Exception:
                # If thumbnail generation fails, ignore silently
                pass


class MembershipCategory(models.Model):
    name = models.CharField(max_length=100)
    experiences = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    year_type = models.CharField(max_length=100, null=True, blank=True)
    vote = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class AssignMembership(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    membership_category = models.ForeignKey(
        MembershipCategory, on_delete=models.CASCADE
    )
    member_id = models.CharField(max_length=100, unique=True)
    committee_type = models.CharField(max_length=100, null=True, blank=True)
    designation = models.CharField(max_length=100, null=True, blank=True)
    assigned_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.membership_category.name}"


class NewsRoom(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to="news/")
    thumbnail = models.ImageField(upload_to="news/thumbnails/", blank=True, null=True)
    is_active = models.BooleanField(default=True)
    news_link = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        # Save original first so `image` has a file
        super().save(*args, **kwargs)

        if self.image:
            try:
                # open image from storage
                img = Image.open(self.image)
                img = img.convert("RGB")
                img.thumbnail((800, 400))
                thumb_io = BytesIO()
                img.save(thumb_io, format="JPEG", quality=85)
                thumb_name = f"thumb_{self.image.name.split('/')[-1].split('\\\\')[-1]}"
                self.thumbnail.save(
                    thumb_name, ContentFile(thumb_io.getvalue()), save=False
                )
                super().save(update_fields=["thumbnail"])
            except Exception:
                # If thumbnail generation fails, ignore silently
                pass


class Gallery(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to="gallery/")
    thumbnail = models.ImageField(
        upload_to="gallery/thumbnails/", blank=True, null=True
    )
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        # Save original first so `image` has a file
        super().save(*args, **kwargs)

        if self.image:
            try:
                # open image from storage
                img = Image.open(self.image)
                img = img.convert("RGB")
                img.thumbnail((800, 400))
                thumb_io = BytesIO()
                img.save(thumb_io, format="JPEG", quality=85)
                thumb_name = f"thumb_{self.image.name.split('/')[-1].split('\\\\')[-1]}"
                self.thumbnail.save(
                    thumb_name, ContentFile(thumb_io.getvalue()), save=False
                )
                super().save(update_fields=["thumbnail"])
            except Exception:
                # If thumbnail generation fails, ignore silently
                pass


class VideoMedia(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    album = models.CharField(max_length=100, blank=True, null=True)
    video_url = models.URLField()
    thumbnail = models.ImageField(upload_to="video/thumbnails/", blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title


class Album(models.Model):
    name = models.CharField(max_length=150, unique=True)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name


class StudyCenter(models.Model):
    title = models.CharField(max_length=200)
    type = models.CharField(
        max_length=100, null=True, blank=True
    )  # e.g., Training, Webinar
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to="study-center/")
    thumbnail = models.ImageField(
        upload_to="study-center/thumbnails/", blank=True, null=True
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        # Save original first so `image` has a file
        super().save(*args, **kwargs)

        if self.image:
            try:
                # open image from storage
                img = Image.open(self.image)
                img = img.convert("RGB")
                img.thumbnail((800, 400))
                thumb_io = BytesIO()
                img.save(thumb_io, format="JPEG", quality=85)
                thumb_name = f"thumb_{self.image.name.split('/')[-1].split('\\\\')[-1]}"
                self.thumbnail.save(
                    thumb_name, ContentFile(thumb_io.getvalue()), save=False
                )
                super().save(update_fields=["thumbnail"])
            except Exception:
                # If thumbnail generation fails, ignore silently
                pass


class Events(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    type = models.CharField(
        max_length=100, null=True, blank=True
    )  # e.g., Conference, Workshop
    organizer = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(upload_to="events/")
    thumbnail = models.ImageField(upload_to="events/thumbnails/", blank=True, null=True)
    event_date = models.DateTimeField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        # Save original first so `image` has a file
        super().save(*args, **kwargs)

        if self.image:
            try:
                # open image from storage
                img = Image.open(self.image)
                img = img.convert("RGB")
                img.thumbnail((800, 400))
                thumb_io = BytesIO()
                img.save(thumb_io, format="JPEG", quality=85)
                thumb_name = f"thumb_{self.image.name.split('/')[-1].split('\\\\')[-1]}"
                self.thumbnail.save(
                    thumb_name, ContentFile(thumb_io.getvalue()), save=False
                )
                super().save(update_fields=["thumbnail"])
            except Exception:
                # If thumbnail generation fails, ignore silently
                pass
class WebsiteInfo(models.Model):
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    facebook_url = models.URLField(blank=True, null=True)
    linkedin_url = models.URLField(blank=True, null=True)
    twitter_url = models.URLField(blank=True, null=True)
    youtube_url = models.URLField(blank=True, null=True)
    total_members = models.PositiveIntegerField(default=0)
    life_members = models.PositiveIntegerField(default=0)
    professional_members = models.PositiveIntegerField(default=0)
    student_members = models.PositiveIntegerField(default=0)
    general_members = models.PositiveIntegerField(default=0)