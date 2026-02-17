import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../../../api/axios";

export default function KnowledgeSharingFr() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

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

  function normalizeItem(i) {
    if (!i) return i;
    return Object.assign(
      {
        id: i.id,
        title: i.title || "",
        description: i.description || "",
        event_date: i.event_date || null,
        image: i.image || null,
        image_url: i.image_url || null,
        thumbnail: i.thumbnail || null,
        thumbnail_url: i.thumbnail_url || null,
        type: i.type || null,
        organizer: i.organizer || null,
        is_active: typeof i.is_active === "boolean" ? i.is_active : true,
      },
      i,
    );
  }

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
        if (mounted) setItems(accum.filter(Boolean).map(normalizeItem));
      } catch (e) {
        console.error("Failed to load events", e);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchAll();
    return () => (mounted = false);
  }, []);

  const searchParams = new URLSearchParams(location.search);
  const filterParam = (searchParams.get("filter") || "").toLowerCase();
  const filteredItems = (function () {
    if (!filterParam) return items;
    if (filterParam === "events") {
      return items.filter((it) => {
        if (!it) return false;
        const t = (it.type || "").toLowerCase();
        return t.includes("event");
      });
    }
    if (filterParam === "initiatives") {
      return items.filter((it) => {
        if (!it) return false;
        const t = (it.type || "").toLowerCase();
        return /initiative|activity/.test(t);
      });
    }
    return items;
  })();

  return (
    <div className="space-y-6 py-12">
      <div className="bg-white rounded shadow mb-32">
        {/* list of events: each item in one row with image left, details right */}
        {loading ? (
          <div className="text-sm text-slate-500">Loading…</div>
        ) : filteredItems && filteredItems.length > 0 ? (
          <div className="mt-8 space-y-6">
            {filteredItems.map((it) => (
              <div key={it.id} className="space-y-3">
                <div className="px-4">
                  <h3 className="text-3xl font-bold text-slate-800">
                    {it.type || "-"}
                  </h3>
                </div>
                <article className="bg-white rounded border overflow-hidden flex flex-col md:flex-row items-stretch">
                  <div className="md:w-1/3 w-full">
                    <div className="h-56 md:h-56 bg-black/5 overflow-hidden flex items-center justify-center">
                      {it.image || it.image_url ? (
                        <img
                          src={resolveImage(it.image || it.image_url)}
                          alt={it.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-sm text-slate-400">No image</div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 md:flex-1">
                    <div className="flex items-center gap-3">
                      <div className="text-xs text-slate-500">
                        Posted: {it.event_date ? timeAgo(it.event_date) : "-"}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800 mt-1">
                      {it.title}
                    </h3>
                    {it.organizer && (
                      <div className="text-sm text-slate-500 mt-1">
                        Organizer: {it.organizer}
                      </div>
                    )}
                    <p className="text-sm text-slate-700 mt-2">
                      {it.description}
                    </p>
                    <div className="mt-3 text-xs text-blue-700">
                      Event Date:{" "}
                      {it.event_date
                        ? new Date(it.event_date).toLocaleDateString()
                        : "-"}
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-slate-500 p-6">No events available.</div>
        )}
      </div>
    </div>
  );
}
