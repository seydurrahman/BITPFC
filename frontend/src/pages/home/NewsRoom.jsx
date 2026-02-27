import { useRef, useEffect, useState, useCallback } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  User,
  ArrowRight as Arrow,
} from "lucide-react";
import axios from "../../api/axios";

export default function NewsRoom() {
  const containerRef = useRef(null);

  const [newsItems, setNewsItems] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);

  // -------------------------
  // Backend origin resolver
  // -------------------------
  const backendOrigin = (axios.defaults.baseURL || "")
    .replace(/\/api\/?$/, "")
    .replace(/\/$/, "");

  const resolveImage = useCallback(
    (path) => {
      if (!path) return null;
      try {
        // handle absolute URLs (http, https), protocol-relative (//), data/blob URLs
        if (typeof path === "string") {
          const s = path.trim();
          if (/^(https?:)?\/\//.test(s) || /^data:/.test(s) || /^blob:/.test(s))
            return s;
          const cleaned = s.replace(/^\//, "");
          return `${backendOrigin}/${cleaned}`;
        }
        // if path is an object with a `url` property
        if (typeof path === "object" && path !== null) {
          const url = path.url || path?.path || String(path);
          return resolveImage(url);
        }
      } catch (e) {
        return null;
      }
      return null;
    },
    [backendOrigin],
  );

  // -------------------------
  // Fetch News List
  // -------------------------
  useEffect(() => {
    let mounted = true;

    const fetchNews = async () => {
      try {
        const res = await axios.get("news-room/");
        if (!mounted) return;

        let items = [];
        const data = res.data;

        if (Array.isArray(data)) items = data;
        else if (data?.results) items = data.results;
        else if (data) items = [data];

        items = items.filter((i) => i.is_active !== false);

        setNewsItems(items);
        // debug: log resolved image URLs
        try {
          // eslint-disable-next-line no-console
          console.debug(
            "Fetched news items:",
            items.map((it) => ({
              id: it.id,
              image: it.image,
              resolved: resolveImage(it.image),
            })),
          );
        } catch (e) {}
      } catch (e) {
        console.error("Failed to load news:", e);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchNews();

    return () => {
      mounted = false;
    };
  }, []);

  // -------------------------
  // Scroll Pagination
  // -------------------------
  const page = useCallback((dir = 1) => {
    const el = containerRef.current;
    if (!el) return;

    const amount = el.clientWidth;
    el.scrollBy({ left: amount * dir, behavior: "smooth" });
  }, []);

  // -------------------------
  // Fetch News Detail
  // -------------------------
  const openDetail = async (id) => {
    setLoadingDetail(true);
    try {
      const res = await axios.get(`news-room/${id}/`);
      setSelectedNews(res.data);
    } catch (err) {
      console.error("Failed to load news detail:", err);
    } finally {
      setLoadingDetail(false);
    }
  };

  // -------------------------
  // Close modal on ESC
  // -------------------------
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setSelectedNews(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <section className="w-full py-14 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-green-800 mb-8">
          News Room
        </h2>

        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading news...</div>
        ) : (
          <div className="relative">
            {/* News Slider */}
            <div
              ref={containerRef}
              className="flex gap-6 overflow-x-auto no-scrollbar py-2 scroll-smooth"
            >
              {newsItems.map((n) => (
                <article
                  key={n.id}
                  className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex-shrink-0 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                  style={{
                    flexBasis: "calc((100% - 72px) / 4)",
                  }}
                >
                  {/* Image */}
                  <div className="h-40 overflow-hidden bg-gray-100">
                    {n.image ? (
                      <img
                        src={resolveImage(n.image)}
                        alt={n.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        onError={(e) => {
                          try {
                            const img = e.currentTarget;
                            const attempted = img.dataset.attempted || "0";
                            if (attempted === "0") {
                              // try alternate forms: add or remove /media/ prefix
                              const src = img.src || "";
                              const backend = backendOrigin;
                              let alt = null;
                              if (src.includes("/media/")) {
                                // remove the first /media/ segment
                                alt = src.replace(/\/media\//, "/");
                              } else {
                                // ensure /media/ is present
                                const cleaned = (n.image || "").replace(
                                  /^\//,
                                  "",
                                );
                                alt = `${backend}/media/${cleaned}`;
                              }
                              if (alt && alt !== src) {
                                img.dataset.attempted = "1";
                                img.src = alt;
                                return;
                              }
                            }
                          } catch (err) {
                            // ignore
                          }
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        <span>
                          {n.created_at
                            ? new Date(n.created_at).toLocaleDateString()
                            : "-"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User size={16} />
                        <span>Admin</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-green-800 mt-3 mb-2">
                      {n.title}
                    </h3>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-4">
                      {n.description}
                    </p>

                    <button
                      onClick={() => openDetail(n.id)}
                      className="inline-flex items-center text-green-800 font-medium hover:underline"
                    >
                      Read more
                      <Arrow className="ml-2" size={16} />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* Pager Buttons */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-4">
              <button
                onClick={() => page(-1)}
                className="w-10 h-10 bg-green-100 text-green-800 rounded-full flex items-center justify-center shadow hover:scale-105 transition"
              >
                <ArrowLeft />
              </button>
              <button
                onClick={() => page(1)}
                className="w-10 h-10 bg-purple-100 text-purple-800 rounded-full flex items-center justify-center shadow hover:scale-105 transition"
              >
                <ArrowRight />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ================= MODAL ================= */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-6 animate-fadeIn">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSelectedNews(null)}
          />

          <div className="relative max-w-3xl w-full bg-white rounded-xl shadow-xl overflow-hidden max-h-[85vh] flex flex-col">
            {/* Header */}
            <div className="p-5 border-b flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold">{selectedNews.title}</h3>
                <div className="text-sm text-slate-500">
                  {selectedNews.created_at
                    ? new Date(selectedNews.created_at).toLocaleString()
                    : "-"}
                  {" • "}Admin
                </div>
              </div>
              <button
                onClick={() => setSelectedNews(null)}
                className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
              >
                Close
              </button>
            </div>

            {/* Image */}
            {selectedNews.image && (
              <div className="h-64 bg-gray-100">
                <img
                  src={resolveImage(selectedNews.image)}
                  alt={selectedNews.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Body */}
            <div className="p-5 overflow-y-auto">
              {loadingDetail ? (
                <div className="text-center py-10 text-gray-500">
                  Loading...
                </div>
              ) : (
                <p className="text-gray-700 whitespace-pre-line">
                  {selectedNews.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Fade animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0 }
            to { opacity: 1 }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-in-out;
          }
        `}
      </style>
    </section>
  );
}
