import { useEffect, useState } from "react";
import axios from "../../../api/axios";

export default function Gallery() {
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
    if (/^photos\//.test(cleaned)) return `${backendOrigin}/media/${cleaned}`;
    return `${backendOrigin}/${cleaned}`;
  };

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get("gallery/");
        const data = res.data;

        // handle paginated results (DRF style) by following `next` links
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
              } else {
                break;
              }
            } catch (e) {
              console.warn("Failed to fetch next page of gallery", e);
              break;
            }
          }
          setItems(all.filter((i) => i != null));
          return;
        }

        // non-paginated responses
        let arr = [];
        if (Array.isArray(data)) arr = data;
        else if (data) arr = [data];
        setItems(arr.filter((i) => i != null));
      } catch (e) {
        console.error("Failed to load gallery", e);
      }
    };
    fetchGallery();
  }, []);

  return (
    <section className="w-full py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-green-800 mb-6">
          Gallery
        </h2>

        {items.length === 0 ? (
          <div className="text-sm text-slate-500">No photos yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {items.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelected(p)}
                className="block w-full bg-white rounded overflow-hidden shadow-sm focus:outline-none"
              >
                <div className="h-64 bg-black/5 overflow-hidden">
                  <img
                    src={resolveImage(p.image)}
                    alt={p.title}
                    className="w-full h-full object-cover"
                  />
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
                  <div className="text-sm text-slate-500">
                    {selected.created_at
                      ? new Date(selected.created_at).toLocaleString()
                      : "-"}
                  </div>
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
              <div className="w-full h-96 bg-black/5">
                <img
                  src={resolveImage(selected.image)}
                  alt={selected.title}
                  className="w-full h-full object-contain"
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
    </section>
  );
}
