from django.db import models

from io import BytesIO
from django.core.files.base import ContentFile
from PIL import Image


class Banner(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to="banners/")
    thumbnail = models.ImageField(
        upload_to="banners/thumbnails/", blank=True, null=True
    )
    is_active = models.BooleanField(default=True)

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
