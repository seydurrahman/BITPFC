import { useEffect, useState } from "react";
import axios from "axios";

const Banner = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/banners/")
      .then((res) => setBanners(res.data));
  }, []);

  return (
    <div className="w-full">
      {banners.length === 0 ? (
        <div className="w-full h-[450px] bg-gray-100 flex items-center justify-center">
          <div className="text-center text-gray-700">
            <h2 className="text-2xl font-semibold">No banners available</h2>
            <p className="text-sm mt-1">
              Ensure the backend API is running at
              http://localhost:8000/api/banners/
            </p>
          </div>
        </div>
      ) : (
        banners.map((b) => (
          <div key={b.id} className="relative w-full h-[450px] overflow-hidden">
            <img
              src={b.image}
              alt={b.title || "banner"}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
            <div className="absolute left-6 bottom-6 text-white">
              {b.title && (
                <h2 className="text-2xl font-semibold drop-shadow">
                  {b.title}
                </h2>
              )}
              {b.subtitle && (
                <p className="text-sm mt-1 drop-shadow">{b.subtitle}</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Banner;
