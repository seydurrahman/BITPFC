import os
import sys

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
import django

django.setup()
from django.contrib.auth import get_user_model
from django.core.files.base import ContentFile
from io import BytesIO
from PIL import Image
import requests

ADMIN_EMAIL = "admin@example.com"
ADMIN_PASS = "AdminPass123!"

User = get_user_model()
if not User.objects.filter(email=ADMIN_EMAIL).exists():
    print("Creating superuser", ADMIN_EMAIL)
    User.objects.create_superuser(
        username="admin", email=ADMIN_EMAIL, password=ADMIN_PASS
    )
else:
    print("Superuser exists")

# create tiny image file in memory
img = Image.new("RGB", (20, 20), (200, 100, 50))
bio = BytesIO()
img.save(bio, format="PNG")
bio.seek(0)

# get token
token_url = "http://127.0.0.1:8000/api/token/"
print("Requesting token...")
# Token endpoint expects 'username' and 'password' fields; provide username for authentication
resp = requests.post(token_url, json={"username": "admin", "password": ADMIN_PASS})
print("Token status:", resp.status_code, resp.text)
if resp.status_code != 200:
    print("Failed to get token, aborting")
    sys.exit(1)
access = resp.json().get("access")
if not access:
    print("No access token in response")
    sys.exit(1)

headers = {"Authorization": f"Bearer {access}"}

post_url = "http://127.0.0.1:8000/api/news-room/"
files = {"image": ("test.png", bio.getvalue(), "image/png")}
data = {
    "title": "Automated test post",
    "description": "from script",
    "news_link": "http://example.com",
}
print("Posting news...")
post_resp = requests.post(post_url, headers=headers, data=data, files=files)
print("Post status:", post_resp.status_code)
print("Post response length:", len(post_resp.text or ""))
try:
    with open("post_response.html", "w", encoding="utf-8") as fout:
        fout.write(post_resp.text or "")
    print("Wrote post_response.html")
except Exception as e:
    print("Failed writing post_response.html", e)

if post_resp.status_code >= 500:
    print(
        "\nServer-side error likely occurred. Attempting to tail server.log (if present).\n"
    )
    try:
        with open("server.log", "r", encoding="utf-8", errors="ignore") as f:
            lines = f.readlines()[-400:]
            print("".join(lines))
    except Exception as e:
        print("Could not read server.log:", e)
