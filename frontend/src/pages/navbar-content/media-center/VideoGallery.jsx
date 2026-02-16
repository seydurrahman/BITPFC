import { useEffect, useState } from "react";
import axios from "../../../api/axios";

export default function VideoGallery() {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);

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
    return `${backendOrigin}/${cleaned}`;
  };

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axios.get("video-media/");
        const data = res.data;

        if (data && Array.isArray(data.results)) {
          let all = data.results.slice();
          let next = data.next;
          while (next) {
            try {
              const r = await axios.get(next);
              const d = r.data;
              if (d && Array.isArray(d.results)) {
                all = all.concat(d.results);
                next = d.next;
              } else break;
            } catch (e) {
              console.warn("Failed to fetch next page of videos", e);
              break;
            }
          }
          setItems(all.filter((i) => i != null));
          return;
        }

        let arr = [];
        if (Array.isArray(data)) arr = data;
        else if (data) arr = [data];
        setItems(arr.filter((i) => i != null));
      } catch (e) {
        console.error("Failed to load videos", e);
      }
    };
    fetchAll();
  }, []);

  const toEmbedUrl = (url) => {
    if (!url) return url;
    try {
      // handle common YouTube formats
      const u = new URL(url);
      if (u.hostname.includes("youtube.com")) {
        const v = u.searchParams.get("v");
        if (v) return `https://www.youtube.com/embed/${v}`;
      }
      if (u.hostname.includes("youtu.be")) {
        const id = u.pathname.replace(/^\//, "");
        if (id) return `https://www.youtube.com/embed/${id}`;
      }
    } catch (e) {
      // fallback
    }
    return url;
  };

  return (
    <div className="w-full py-12">
      <div className="max-w-7xl mx-auto px-6 mb-36">
        <h2 className="text-3xl md:text-4xl font-extrabold text-green-800 mb-6">
          Video Gallery
        </h2>

        {items.length === 0 ? (
          <div className="text-sm text-slate-500">No videos yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelected(v)}
                className="block w-full bg-white rounded overflow-hidden shadow-sm focus:outline-none text-left"
              >
                <div className="h-56 bg-black/5 flex items-center justify-center overflow-hidden bg-black">
                  {v.thumbnail ? (
                    <img
                      src={resolveImage(v.thumbnail)}
                      alt={v.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white">
                      No thumbnail
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="font-semibold text-lg">{v.title}</div>
                  <div className="text-sm text-slate-500">{v.album || ""}</div>
                </div>
              </button>
            ))}
          </div>
        )}

        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setSelected(null)}
            />
            <div className="relative max-w-4xl w-full bg-white rounded shadow-lg overflow-auto max-h-[90vh]">
              <div className="p-4 border-b flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">{selected.title}</h3>
                  <div className="text-sm text-slate-500">{selected.album}</div>
                </div>
                <div>
                  <button
                    onClick={() => setSelected(null)}
                    className="px-3 py-1 bg-gray-100 rounded"
                  >
                    Close
                  </button>
                </div>
              </div>
              <div className="w-full bg-black/5 flex items-center justify-center">
                <iframe
                  src={toEmbedUrl(selected.video_url)}
                  title={selected.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-[70vh]"
                />
              </div>
              <div className="p-4">
                <div className="prose max-w-none">
                  <p>{selected.description}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
