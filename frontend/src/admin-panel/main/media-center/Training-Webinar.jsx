import { useEffect, useRef, useState } from "react";
import axios from "../../../api/axios";

export default function TrainingWebinar() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Training");
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
        const res = await axios.get("study-center/");
        const data = res.data;
        let arr = [];
        if (Array.isArray(data)) arr = data;
        else if (data && Array.isArray(data.results)) arr = data.results;
        else if (data) arr = [data];
        setItems(arr.filter((i) => i));
      } catch (e) {
        console.error("Failed to load study center items", e);
      }
    };
    fetch();
  }, []);

  const handleFile = (f) => {
    if (!f) return;
    setFile(f);
    try {
      setPreview(URL.createObjectURL(f));
    } catch (e) {
      setPreview(null);
    }
  };

  const handleSelect = (e) => handleFile(e.target.files?.[0]);

  const upload = async () => {
    if (!file || !title) {
      alert("Please provide a title and an image.");
      return;
    }
    const fd = new FormData();
    fd.append("title", title);
    fd.append("description", description);
    fd.append("type", type);
    fd.append("image", file);

    try {
      const res = await axios.post("study-center/", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res && res.data) setItems((s) => [res.data, ...s]);
      // clear form
      setTitle("");
      setDescription("");
      setType("Training");
      if (preview) URL.revokeObjectURL(preview);
      setPreview(null);
      setFile(null);
    } catch (e) {
      console.error("Upload failed", e);
      alert("Upload failed");
    }
  };

  const deleteItem = async (id) => {
    if (!confirm("Delete this item?")) return;
    try {
      await axios.delete(`study-center/${id}/`);
      setItems((s) => s.filter((x) => x.id !== id));
    } catch (e) {
      console.error("Delete failed", e);
      alert("Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-4 bg-white rounded shadow">
        <h3 className="text-lg font-semibold mb-3">Add Training / Webinar</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="col-span-2 border rounded px-2 py-1"
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option>Training</option>
            <option>Webinar</option>
          </select>
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
        <h3 className="text-lg font-semibold mb-3">Existing Items</h3>
        {items.length === 0 ? (
          <div className="text-sm text-slate-500">No items yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {items.map((it) => (
              <div key={it.id} className="border rounded overflow-hidden">
                <div className="h-40 bg-black/5 overflow-hidden">
                  <img
                    src={resolveImage(it.image)}
                    alt={it.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 flex items-start justify-between">
                  <div>
                    <div className="font-medium">{it.title}</div>
                    <div className="text-xs text-slate-500">{it.type}</div>
                  </div>
                  <button
                    onClick={() => deleteItem(it.id)}
                    className="text-red-600"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
