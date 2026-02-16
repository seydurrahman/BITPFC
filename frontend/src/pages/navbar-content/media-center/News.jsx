import { useEffect, useState } from "react";
import axios from "../../../api/axios";
import { Calendar, User, ArrowRight } from "lucide-react";

function News() {
  const [newsItems, setNewsItems] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const backendOrigin = (() => {
    try {
      const b = axios.defaults.baseURL || "";
      return b.replace(/\/api\/?$/, "").replace(/\/$/, "");
    } catch (e) {
      return "";
    }
  })();

  const resolveImage = (path) => {
    if (!path) return null;
    if (typeof path === "string" && /^https?:\/\//.test(path)) return path;
    const cleaned = (path || "").replace(/^\//, "");
    if (/^media\//.test(cleaned)) return `${backendOrigin}/${cleaned}`;
    if (/^photos\//.test(cleaned)) return `${backendOrigin}/media/${cleaned}`;
    return `${backendOrigin}/${cleaned}`;
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get("news-room/");
        const data = res.data;
        let items = [];
        if (Array.isArray(data)) items = data;
        else if (data && Array.isArray(data.results)) items = data.results;
        else if (data) items = [data];
        items = items.filter((i) => i.is_active !== false);
        setNewsItems(items);
      } catch (e) {
        console.error("Failed to load news", e);
      }
    };
    fetchNews();
  }, []);

  return (
    <section className="w-full py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-green-800 mb-6">
          News
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsItems.map((n) => (
            <article
              key={n.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="h-40 overflow-hidden">
                {n.image ? (
                  <img
                    src={resolveImage(n.image)}
                    alt={n.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100" />
                )}
              </div>
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
                    <span>By Admin</span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-green-800 mt-3 mb-2">
                  {n.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-4">
                  {n.description}
                </p>

                <button
                  onClick={async (e) => {
                    e.preventDefault();
                    setLoadingDetail(true);
                    try {
                      const res = await axios.get(`news-room/${n.id}/`);
                      setSelectedNews(res.data);
                    } catch (err) {
                      console.error("Failed to load news detail", err);
                    } finally {
                      setLoadingDetail(false);
                    }
                  }}
                  className="inline-flex items-center text-green-800 font-medium hover:underline"
                >
                  Read more
                  <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>

        {selectedNews && (
          <div className="fixed inset-0 z-50 flex items-start justify-center p-6">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setSelectedNews(null)}
            />
            <div className="relative max-w-3xl w-full bg-white rounded shadow-lg overflow-auto max-h-[80vh]">
              <div className="p-4 border-b flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">{selectedNews.title}</h3>
                  <div className="text-sm text-slate-500">
                    {selectedNews.created_at
                      ? new Date(selectedNews.created_at).toLocaleString()
                      : "-"}
                    {" • "}By Admin
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => setSelectedNews(null)}
                    className="px-3 py-1 bg-gray-100 rounded"
                  >
                    Close
                  </button>
                </div>
              </div>
              {selectedNews.image && (
                <div className="w-full h-64 bg-gray-100">
                  <img
                    src={resolveImage(selectedNews.image)}
                    alt={selectedNews.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <div className="prose max-w-none">
                  <p>{selectedNews.description}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default News;
