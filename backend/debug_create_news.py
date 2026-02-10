import os
import sys

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
import django

django.setup()
from core.models import NewsRoom
from django.core.files.base import ContentFile
from PIL import Image
from io import BytesIO

try:
    # create tiny image in memory
    img = Image.new("RGB", (10, 10), (123, 222, 111))
    bio = BytesIO()
    img.save(bio, format="PNG")
    bio.seek(0)
    nf = NewsRoom(title="dbg", description="dbg", news_link="http://x")
    nf.image.save("dbg_test.png", ContentFile(bio.getvalue()), save=False)
    nf.save()
    print("Saved NewsRoom id=", nf.id)
except Exception as e:
    import traceback

    traceback.print_exc()
    sys.exit(1)
