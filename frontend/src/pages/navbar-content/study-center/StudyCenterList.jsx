import { useEffect, useState } from "react";
import axios from "../../../api/axios";

export default function StudyCenterList({
  filterType = "training",
  heading = "Training",
}) {
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
        const res = await axios.get("study-center/");
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
              console.warn("Failed to fetch next page of study-center", e);
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
        console.error("Failed to load study center items", e);
      }
    };
    fetchAll();
  }, []);

  const filtered = items.filter(
    (it) => (it?.type || "").toLowerCase() === (filterType || "").toLowerCase(),
  );

  return (
    <section className="w-full py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-green-800 mb-6">
          {heading}
        </h2>

        {filtered.length === 0 ? (
          <div className="text-sm text-slate-500">No items yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.map((it) => (
              <button
                key={it.id}
                onClick={() => setSelected(it)}
                className="block w-full bg-white rounded overflow-hidden shadow-sm focus:outline-none text-left"
              >
                <div className="h-80 bg-black/5 flex items-center justify-center overflow-hidden bg-white">
                  <img
                    src={resolveImage(it.image)}
                    alt={it.title}
                    className="max-h-full w-auto object-contain"
                  />
                </div>
                <div className="p-4">
                  <div className="font-semibold text-lg">{it.title}</div>
                  <div className="text-sm text-slate-500">{it.type}</div>
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
            <div className="relative max-w-3xl w-full bg-white rounded shadow-lg overflow-auto max-h-[90vh]">
              <div className="p-4 border-b flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">{selected.title}</h3>
                  <div className="text-sm text-slate-500">{selected.type}</div>
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
                <img
                  src={resolveImage(selected.image)}
                  alt={selected.title}
                  className="max-h-[70vh] w-auto object-contain"
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
