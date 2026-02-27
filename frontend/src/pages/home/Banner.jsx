import { useEffect, useState } from "react";
import axios from "../../api/axios";

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [index, setIndex] = useState(0);

  // Fetch banners
  useEffect(() => {
    let mounted = true;

    const fetchBanners = async () => {
      try {
        const res = await axios.get("banners/");
        const data = res.data || {};
        const list = Array.isArray(data) ? data : data.results || [];
        if (mounted) setBanners(list);
      } catch (error) {
        console.error("Failed fetching banners:", error);
        if (mounted) setBanners([]);
      }
    };

    fetchBanners();
    return () => {
      mounted = false;
    };
  }, []);

  // Auto slide every 5 seconds
  useEffect(() => {
    if (banners.length <= 1) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  // Reset index safely if banners change
  useEffect(() => {
    if (index >= banners.length) {
      setIndex(0);
    }
  }, [banners.length, index]);

  const b = banners[index];

  // Resolve image URL
  const apiOrigin = (import.meta.env.VITE_API_URL || "").replace(
    /\/api\/?$/,
    "",
  );
  const imageRawInitial = b?.image_url || b?.thumbnail_url || b?.image || "";

  // Normalize possible object shapes and whitespace
  let imageRaw = imageRawInitial;
  try {
    if (imageRaw && typeof imageRaw === "object") {
      imageRaw = imageRaw.url || String(imageRaw) || "";
    }
    if (typeof imageRaw === "string") imageRaw = imageRaw.trim();
  } catch (e) {
    imageRaw = "";
  }

  const imageSrc =
    imageRaw &&
    (/^(https?:)?\/\//.test(imageRaw) ||
    /^data:/.test(imageRaw) ||
    /^blob:/.test(imageRaw)
      ? imageRaw
      : `${apiOrigin}${imageRaw.startsWith("/") ? "" : "/"}${imageRaw}`);

  // Debug help: log resolved values when an image is expected but missing
  useEffect(() => {
    if (banners) {
      // eslint-disable-next-line no-console
      console.debug("Banner data:", b, { imageRawInitial, imageRaw, imageSrc });
    }
  }, [banners, b, imageRawInitial, imageRaw, imageSrc]);

  if (!banners.length) {
    return (
      <div className="w-full h-[450px] bg-gray-100 flex items-center justify-center">
        <div className="text-center text-gray-700">
          <h2 className="text-2xl font-semibold">No banners available</h2>
          <p className="text-sm mt-1">
            Ensure the backend API is running at /api/banners/
          </p>
        </div>
      </div>
    );
  }

  const prev = () => setIndex((i) => (i - 1 + banners.length) % banners.length);

  const next = () => setIndex((i) => (i + 1) % banners.length);

  const goTo = (i) => setIndex(i);

  return (
    <div className="w-full h-[450px] overflow-hidden mb-8">
      <div className="flex h-full flex-col md:flex-row">
        {/* LEFT CONTENT */}
        <div className="md:w-1/2 w-full p-8 flex flex-col justify-center bg-gradient-to-r from-blue-700 via-purple-600 to-purple-800 text-white relative pb-12">
          {b.title && (
            <h2 className="text-3xl font-bold mb-2 transition-all duration-500">
              {b.title}
            </h2>
          )}
          {b.description && (
            <p className="text-md max-w-md transition-all duration-500">
              {b.description}
            </p>
          )}

          {/* Arrows */}
          <button
            onClick={prev}
            aria-label="Previous banner"
            className="absolute left-4 bottom-4 bg-white/10 hover:bg-white/20 rounded-full p-2"
          >
            ❮
          </button>

          <button
            onClick={next}
            aria-label="Next banner"
            className="absolute right-4 bottom-4 bg-white/10 hover:bg-white/20 rounded-full p-2"
          >
            ❯
          </button>

          {/* Dots */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex gap-2">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === index ? "bg-white scale-110" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="md:w-1/2 w-full relative h-64 md:h-full bg-gray-100 overflow-hidden">
          {imageSrc ? (
            <div
              className="hidden md:block w-full h-full bg-center bg-no-repeat bg-cover transition-all duration-700 ease-in-out"
              style={{ backgroundImage: `url("${imageSrc}")` }}
              role="img"
              aria-label={b.title || "banner"}
            />
          ) : (
            <div className="hidden md:block w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-sm text-gray-500">No image</span>
            </div>
          )}

          <img
            src={imageSrc || undefined}
            alt={b.title || "banner"}
            loading="lazy"
            onError={(e) => {
              // eslint-disable-next-line no-console
              console.warn(
                "Banner image failed to load:",
                e?.currentTarget?.src,
              );
              e.currentTarget.style.display = "none";
            }}
            className="md:hidden w-full h-full object-cover object-center transition-all duration-700 ease-in-out"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
