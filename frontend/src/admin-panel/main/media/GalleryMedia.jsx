import { useState, useRef } from "react";
import axios from "../../../api/axios";

export default function GalleryMedia() {
  const [files, setFiles] = useState([]); // {file, preview, title, description, progress, status}
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

  const uploadAll = async () => {
    for (let i = 0; i < files.length; i++) {
      if (files[i].status === "uploaded" || files[i].status === "uploading")
        continue;
      await uploadOne(i);
    }
  };

  const uploadOne = async (idx) => {
    const item = files[idx];
    if (!item) return;
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

      setFiles((s) =>
        s.map((x, i) =>
          i === idx ? { ...x, status: "uploaded", progress: 100 } : x,
        ),
      );
    } catch (err) {
      console.error("Upload failed", err);
      setFiles((s) =>
        s.map((x, i) => (i === idx ? { ...x, status: "error" } : x)),
      );
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h3 className="text-lg font-semibold mb-4">Upload Gallery Photos</h3>

      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-gray-200 rounded-md p-6 text-center mb-4"
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

      {files.length > 0 && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            {files.map((f, idx) => (
              <div
                key={idx}
                className="border rounded overflow-hidden bg-gray-50"
              >
                <div className="h-40 bg-black/5 flex items-center justify-center overflow-hidden">
                  <img
                    src={f.preview}
                    alt={f.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
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
                          i === idx ? { ...x, description: e.target.value } : x,
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

          <div className="flex gap-3">
            <button
              onClick={uploadAll}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Upload All
            </button>
            <button
              onClick={() => setFiles([])}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
