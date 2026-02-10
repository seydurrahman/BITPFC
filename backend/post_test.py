import requests, os

url = "http://127.0.0.1:8000/api/news-room/"
# find an image in project
# candidate paths to search for an image file
candidates = [
    "D:/Programming-Project/bitpfc/frontend/src/assets/Banner/placeholder.png",
    "D:/Programming-Project/bitpfc/frontend/src/assets/Advisor_image",
]
img = None
for p in candidates:
    if os.path.exists(p) and os.path.isfile(p):
        img = p
        break
# if candidate is a directory, try to find an image file inside
if not img:
    for base in candidates:
        if os.path.exists(base) and os.path.isdir(base):
            for fn in os.listdir(base):
                if fn.lower().endswith((".png", ".jpg", ".jpeg", ".gif")):
                    img = os.path.join(base, fn)
                    break
            if img:
                break
# fallback: create a tiny PNG
if not img:
    try:
        from PIL import Image

        img = "temp_test_image.png"
        Image.new("RGB", (10, 10), (255, 0, 0)).save(img)
    except Exception:
        # create a simple byte file
        img = "temp_test_image.bin"
        with open(img, "wb") as f:
            f.write(b"0")

files = {"image": open(img, "rb")}
data = {
    "title": "Test from script",
    "description": "desc from script",
    "news_link": "http://example.com",
}
try:
    r = requests.post(url, data=data, files=files)
    print("Status", r.status_code)
    print("Response", r.text)
except Exception as e:
    print("Error", e)
finally:
    files["image"].close()
