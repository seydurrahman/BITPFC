import os
import sys
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
try:
    # Ensure project root is on sys.path so 'config' package is importable
    # backend directory contains the Django project package `config`
    project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    if project_root not in sys.path:
        sys.path.insert(0, project_root)

    django.setup()
except Exception as e:
    print("DJANGO_SETUP_ERROR", e)
    sys.exit(1)

from django.conf import settings

print("MEDIA_ROOT:", settings.MEDIA_ROOT)

files = [
    "news/news1.png",
    "news/news5_q8A8ShQ.png",
    "banners/Screenshot_2.png",
    "photos/finland-Read_even_if_you_sink.png",
]

for f in files:
    p = os.path.join(settings.MEDIA_ROOT, f)
    exists = os.path.exists(p)
    size = None
    try:
        if exists:
            size = os.path.getsize(p)
    except Exception as e:
        size = f"ERR:{e}"
    print(
        f,
        "EXISTS" if exists else "MISSING",
        "size=" + (str(size) if size is not None else "NA"),
        "abs=" + os.path.abspath(p),
    )
