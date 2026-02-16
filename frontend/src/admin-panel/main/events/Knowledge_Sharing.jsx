import { useEffect, useRef, useState } from "react";
import axios from "../../../api/axios";

export default function KnowledgeSharing() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [items, setItems] = useState([]);
  const inputRef = useRef();

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
    const fetch = async () => {
      try {
        const res = await axios.get("events/");
        const data = res.data;
        let arr = [];
        if (Array.isArray(data)) arr = data;
        else if (data && Array.isArray(data.results)) arr = data.results;
        else if (data) arr = [data];
        setItems(arr.filter((i) => i));
      } catch (e) {
        console.error("Failed to load events", e);
      }
    };
    fetch();
  }, []);

  const handleSelect = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    try {
      setPreview(URL.createObjectURL(f));
    } catch (e) {
      setPreview(null);
    }
  };

  const upload = async () => {
    if (!title || !file || !eventDate) {
      alert("Please provide title, image and event date.");
      return;
    }
    const fd = new FormData();
    fd.append("title", title);
    fd.append("description", description);
    // convert local datetime-local to ISO
    try {
      const iso = new Date(eventDate).toISOString();
      fd.append("event_date", iso);
    } catch (e) {
      fd.append("event_date", eventDate);
    }
    fd.append("image", file);

    try {
      const res = await axios.post("events/", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res && res.data) setItems((s) => [res.data, ...s]);
      // clear
      setTitle("");
      setDescription("");
      setEventDate("");
      if (preview) URL.revokeObjectURL(preview);
      setPreview(null);
      setFile(null);
      if (inputRef.current) inputRef.current.value = null;
    } catch (e) {
      console.error("Upload failed", e);
      alert("Upload failed");
    }
  };

  const deleteItem = async (id) => {
    if (!confirm("Delete this event?")) return;
    try {
      await axios.delete(`events/${id}/`);
      setItems((s) => s.filter((x) => x.id !== id));
    } catch (e) {
      console.error("Delete failed", e);
      alert("Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-4 bg-white rounded shadow">
        <h3 className="text-lg font-semibold mb-3">
          Upload Project / Knowledge Sharing
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="col-span-2 border rounded px-2 py-1"
          />

          <input
            type="datetime-local"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full border rounded px-2 py-1 mb-3"
          rows={3}
        />

        <div className="flex items-center gap-3">
          <label className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded cursor-pointer">
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleSelect}
              className="hidden"
            />
            Select image
          </label>
          <button
            onClick={upload}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
          {preview && (
            <div className="h-20 w-28 overflow-hidden rounded">
              <img
                src={preview}
                alt="preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>

      <div className="p-4 bg-white rounded shadow">
        <h3 className="text-lg font-semibold mb-3">Saved Projects</h3>
        {items.length === 0 ? (
          <div className="text-sm text-slate-500">No items yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {items.map((it) => (
              <div key={it.id} className="border rounded overflow-hidden">
                <div className="h-36 bg-black/5 overflow-hidden">
                  <img
                    src={resolveImage(it.image)}
                    alt={it.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 flex items-start justify-between gap-3">
                  <div>
                    <div className="font-medium text-sm text-green-800">
                      {it.title}
                    </div>
                    <div className="text-xs text-slate-500">
                      {it.event_date
                        ? new Date(it.event_date).toLocaleDateString()
                        : "-"}
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <button
                      onClick={() => deleteItem(it.id)}
                      title="Delete"
                      className=" hover:bg-white text-red-600 rounded-full p-0.5 shadow-sm border-gray-300 border"
                    >
                      <span className="text-xl font-bold">×</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
