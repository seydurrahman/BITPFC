import { useState, useRef, useEffect } from "react";
import axios from "../../../api/axios";

export default function GalleryMedia() {
  const [files, setFiles] = useState([]); // {file, preview, title, description, progress, status}
  const [persistedPhotos, setPersistedPhotos] = useState([]);
  const inputRef = useRef();

  const onFiles = (fileList) => {
    const arr = Array.from(fileList).map((f) => ({
      file: f,
      preview: URL.createObjectURL(f),
      title: f.name.replace(/\.[^.]+$/, ""),
      description: "",
      progress: 0,
      status: "pending",
    }));
    setFiles((s) => [...s, ...arr]);
  };

  const handleSelect = (e) => onFiles(e.target.files);

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer?.files?.length) onFiles(e.dataTransfer.files);
  };

  const removeIndex = (idx) => {
    const f = files[idx];
    if (f?.preview) URL.revokeObjectURL(f.preview);
    setFiles((s) => s.filter((_, i) => i !== idx));
  };

  const uploadOne = async (idx) => {
    const item = files[idx];
    if (!item) return;
    const preview = item.preview;
    const fd = new FormData();
    fd.append("title", item.title || "");
    fd.append("description", item.description || "");
    fd.append("image", item.file);

    setFiles((s) =>
      s.map((x, i) =>
        i === idx ? { ...x, status: "uploading", progress: 0 } : x,
      ),
    );

    try {
      const res = await axios.post("gallery/", fd, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (ev) => {
          const prog = Math.round((ev.loaded * 100) / (ev.total || 1));
          setFiles((s) =>
            s.map((x, i) => (i === idx ? { ...x, progress: prog } : x)),
          );
        },
      });

      // mark uploaded
      setFiles((s) =>
        s.map((x, i) =>
          i === idx ? { ...x, status: "uploaded", progress: 100 } : x,
        ),
      );

      if (res && res.data) {
        setPersistedPhotos((p) => [res.data, ...p]);
        // remove uploaded file from upload list and revoke preview URL
        try {
          if (preview) URL.revokeObjectURL(preview);
        } catch (e) {}
        setFiles((s) => s.filter((x) => x.preview !== preview));
      }
    } catch (err) {
      console.error("Upload failed", err);
      setFiles((s) =>
        s.map((x, i) => (i === idx ? { ...x, status: "error" } : x)),
      );
    }
  };

  // bulk upload removed — use per-file upload; upload panel clears each file after it's uploaded

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
    const fetchSaved = async () => {
      try {
        const res = await axios.get("gallery/");
        const data = res.data;
        let items = [];
        if (Array.isArray(data)) items = data;
        else if (data && Array.isArray(data.results)) items = data.results;
        else if (data) items = [data];
        setPersistedPhotos(items.filter((i) => i));
      } catch (e) {
        console.error("Failed to load gallery items", e);
      }
    };
    fetchSaved();
  }, []);

  const deletePhoto = async (id) => {
    if (!confirm("Delete this photo?")) return;
    try {
      await axios.delete(`gallery/${id}/`);
      setPersistedPhotos((p) => p.filter((x) => x.id !== id));
    } catch (e) {
      console.error("Failed to delete photo", e);
      alert("Failed to delete photo");
    }
  };

  return (
    <div className="space-y-6">
      {/* Top: upload panel */}
      <div className="p-2 bg-white rounded shadow">
        <div className="flex items-center justify-evenly mb-2">
          <h3 className="text-2xl font-semibold">Upload Gallery Photos</h3>
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-gray-200 rounded-md p-2 text-center mb-4"
          >
            <p className="mb-2">Drag & drop images here, or</p>
            <div className="flex justify-center">
              <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-green-600 text-white rounded">
                <input
                  ref={inputRef}
                  multiple
                  type="file"
                  accept="image/*"
                  onChange={handleSelect}
                  className="hidden"
                />
                Select files
              </label>
            </div>
          </div>
        </div>

        {files.length > 0 && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mb-4">
              {files.map((f, idx) => (
                <div
                  key={idx}
                  className="border rounded overflow-hidden bg-gray-50 flex"
                >
                  <div className="w-1/3 h-28 bg-black/5 flex items-center justify-center overflow-hidden">
                    <img
                      src={f.preview}
                      alt={f.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 flex-1">
                    <input
                      value={f.title}
                      onChange={(e) =>
                        setFiles((s) =>
                          s.map((x, i) =>
                            i === idx ? { ...x, title: e.target.value } : x,
                          ),
                        )
                      }
                      className="w-full mb-2 border rounded px-2 py-1"
                      placeholder="Title"
                    />
                    <input
                      value={f.description}
                      onChange={(e) =>
                        setFiles((s) =>
                          s.map((x, i) =>
                            i === idx
                              ? { ...x, description: e.target.value }
                              : x,
                          ),
                        )
                      }
                      className="w-full mb-2 border rounded px-2 py-1"
                      placeholder="Description (optional)"
                    />

                    <div className="flex items-center justify-between gap-2">
                      <div className="flex-1 mr-2">
                        {f.status === "uploading" && (
                          <div className="w-full bg-gray-200 rounded h-2">
                            <div
                              className="bg-green-600 h-2 rounded"
                              style={{ width: `${f.progress}%` }}
                            />
                          </div>
                        )}
                        {f.status === "uploaded" && (
                          <div className="text-sm text-green-700">Uploaded</div>
                        )}
                        {f.status === "error" && (
                          <div className="text-sm text-red-600">Error</div>
                        )}
                      </div>
                      <div className="flex-shrink-0 flex gap-2">
                        <button
                          onClick={() => uploadOne(idx)}
                          className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                        >
                          Upload
                        </button>
                        <button
                          onClick={() => removeIndex(idx)}
                          className="px-3 py-1 bg-gray-200 rounded text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Below: saved photos */}
      <div className="p-6 bg-white rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Saved Photos</h3>
        {persistedPhotos.length === 0 ? (
          <div className="text-sm text-slate-500">No photos yet.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {persistedPhotos.map((p) => (
              <div key={p.id} className="border rounded overflow-hidden">
                <div className="h-36 bg-black/5 overflow-hidden">
                  <img
                    src={resolveImage(p.image)}
                    alt={p.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-3 flex items-start justify-between gap-3">
                  <div>
                    <div className="font-medium text-sm text-green-800">
                      {p.title}
                    </div>
                    <div className="text-xs text-slate-500">
                      {p.created_at
                        ? new Date(p.created_at).toLocaleDateString()
                        : "-"}
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <button
                      onClick={() => deletePhoto(p.id)}
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
