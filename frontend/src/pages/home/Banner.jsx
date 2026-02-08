import { useEffect, useState, useRef } from "react";
import axios from "../../api/axios";

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await axios.get("banners/");
        const data = res.data || {};
        const list = Array.isArray(data) ? data : data.results || [];
        if (mounted) setBanners(list);
      } catch (e) {
        console.error("Failed fetching banners", e);
        if (mounted) setBanners([]);
      }
    })();
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    // reset index when banners change
    setIndex(0);
  }, [banners.length]);

  useEffect(() => {
    // auto-advance every 5s if multiple banners
    if ((banners?.length || 0) <= 1) return undefined;
    startAutoAdvance();
    return () => stopAutoAdvance();
  }, [banners]);

  const startAutoAdvance = (interval = 5000) => {
    stopAutoAdvance();
    if ((banners?.length || 0) <= 1) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % banners.length);
    }, interval);
  };

  const stopAutoAdvance = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const goTo = (i) => {
    setIndex(i);
    startAutoAdvance();
  };

  const prev = () => {
    setIndex((i) => (i - 1 + banners.length) % banners.length);
    startAutoAdvance();
  };

  const next = () => {
    setIndex((i) => (i + 1) % banners.length);
    startAutoAdvance();
  };

  if (!banners || banners.length === 0) {
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

  const b = banners[index];

  return (
    <div className="w-full h-[450px] overflow-hidden mb-8">
      <div className="flex h-full flex-col md:flex-row">
        <div className="md:w-1/2 w-full p-8 flex flex-col justify-center bg-gradient-to-r from-blue-700 via-purple-600 to-purple-800 text-white relative pb-12">
          {b.title && <h2 className="text-3xl font-bold mb-2">{b.title}</h2>}
          {b.description && <p className="text-md max-w-md">{b.description}</p>}

          {/* Arrows inside title/description div */}
          <button
            onClick={prev}
            aria-label="Previous banner"
            className="absolute left-4 bottom-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 z-20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.293 16.293a1 1 0 010 1.414l-6-6a1 1 0 010-1.414l6-6a1 1 0 111.414 1.414L8.414 10l5.293 5.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <button
            onClick={next}
            aria-label="Next banner"
            className="absolute right-4 bottom-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 z-20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.707 3.707a1 1 0 010-1.414l6 6a1 1 0 010 1.414l-6 6a1 1 0 11-1.414-1.414L11.586 10 6.293 4.707a1 1 0 011.414-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {/* Dots centered between arrows */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex items-center gap-2 z-20">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to banner ${i + 1}`}
                className={`w-3 h-3 rounded-full transition-colors ${i === index ? "bg-white" : "bg-white/40"}`}
              />
            ))}
          </div>
        </div>

        <div className="md:w-1/2 w-full relative h-64 md:h-full bg-gray-100 flex items-center justify-center overflow-hidden">
          {/* Use background on md+ with contain focal point, fallback to img on small screens */}
          <div
            className="hidden md:block w-full h-full bg-center bg-no-repeat bg-cover z-0"
            style={{
              backgroundImage: `url(${b.image_url || b.image})`,
              backgroundPosition: "center",
            }}
            role="img"
            aria-label={b.title || "banner"}
          />

          <img
            src={b.image_url || b.image}
            alt={b.title || "banner"}
            loading="lazy"
            className="md:hidden max-h-full w-full object-cover object-center rounded-xl"
          />

          {/* (moved arrows into the left/title div) */}
        </div>
      </div>
    </div>
  );
};

export default Banner;
