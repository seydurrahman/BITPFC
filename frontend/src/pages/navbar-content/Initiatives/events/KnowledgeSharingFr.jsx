import { useEffect, useState } from "react";
import axios from "../../../../api/axios";

export default function KnowledgeSharingFr() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

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
    return `${backendOrigin}/${cleaned}`;
  };

  const timeAgo = (iso) => {
    if (!iso) return "-";
    const then = new Date(iso).getTime();
    if (isNaN(then)) return "-";
    const diff = Date.now() - then;
    if (diff < 0) return "just now";
    const sec = Math.floor(diff / 1000);
    const min = Math.floor(sec / 60);
    const hrs = Math.floor(min / 60);
    const days = Math.floor(hrs / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
    if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;
    if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hrs > 0) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
    if (min > 0) return `${min} minute${min > 1 ? "s" : ""} ago`;
    return `${sec} second${sec > 1 ? "s" : ""} ago`;
  };

  useEffect(() => {
    let mounted = true;
    const fetchAll = async () => {
      setLoading(true);
      try {
        let url = "events/";
        const accum = [];
        while (url) {
          const res = await axios.get(url);
          const data = res.data;
          if (Array.isArray(data)) {
            accum.push(...data);
            break;
          }
          if (data && Array.isArray(data.results)) {
            accum.push(...data.results);
            url = data.next
              ? data.next.replace(backendOrigin + "/api/", "")
              : null;
          } else if (data) {
            accum.push(data);
            break;
          } else break;
        }
        if (mounted) setItems(accum.filter(Boolean));
      } catch (e) {
        console.error("Failed to load events", e);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchAll();
    return () => (mounted = false);
  }, []);

  return (
    <div className="space-y-6 py-12">
      <div className="bg-white rounded shadow">
        {/* featured card */}
        {loading ? (
          <div className="text-sm text-slate-500">Loading…</div>
        ) : (
          (() => {
            const sample = {
              id: "sample-tally-2025",
              title:
                "Knowledge Sharing Session on Tally Prime & Third-Party Software Integration",
              description:
                "A Knowledge Sharing Session on Tally Prime focusing on Networking, Collaboration, and Business Growth. The session highlights how Tally Prime streamlines accounting, enhances teamwork through connected business operations, and supports effective decision-making for improved productivity and collaboration across departments.",
              event_date: "2025-10-11T00:00:00Z",
              postedAgo: "Posted: 4 months ago",
              image: null,
            };

            const featured = items && items.length > 0 ? items[0] : sample;

            return (
              <div className="md:flex md:gap-6 items-stretch mb-32">
                <div className="md:w-1/2 h-64 md:h-auto bg-gradient-to-tr from-slate-100 to-white rounded overflow-hidden flex items-center justify-center">
                  {featured.image ? (
                    <img
                      src={resolveImage(featured.image)}
                      alt={featured.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center p-6">
                      <div className="text-center">
                        <div className="text-xs text-slate-500 mb-2">Image</div>
                        <div className="text-sm text-slate-400">
                          No image provided
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="md:flex-1 mt-4 md:mt-0">
                  <div className="text-sm text-slate-500">
                    Posted: {timeAgo(featured.event_date)}
                  </div>
                  <h1 className="text-xl md:text-3xl font-bold text-slate-800 mt-2">
                    {featured.title}
                  </h1>
                  <div className="text-sm text-slate-600 mt-2">
                    {featured.description}
                  </div>

                  <div className="mt-4 flex items-center gap-4">
                    <div className="px-3 py-2 bg-blue-50 text-blue-700 rounded">
                      Event Date:{" "}
                      {featured.event_date
                        ? new Date(featured.event_date).toLocaleDateString()
                        : "-"}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()
        )}

        {/* grid of other events */}
        {!loading && items && items.length > 1 && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {items.slice(1).map((it) => (
              <article
                key={it.id}
                className="border rounded overflow-hidden bg-white"
              >
                <div className="h-36 bg-black/5 overflow-hidden">
                  {it.image ? (
                    <img
                      src={resolveImage(it.image)}
                      alt={it.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm text-slate-400">
                      No image
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm text-green-800">
                    {it.title}
                  </h3>
                  <div className="text-xs text-slate-500 mt-1">
                    {it.event_date
                      ? new Date(it.event_date).toLocaleString()
                      : "-"}
                  </div>
                  <p className="text-sm text-slate-700 mt-2">
                    {it.description
                      ? it.description.length > 120
                        ? it.description.slice(0, 120) + "…"
                        : it.description
                      : ""}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
