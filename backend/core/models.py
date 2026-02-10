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
