import { useEffect, useRef, useState } from "react";
import axios from "../../../api/axios";

export default function VideoMedia() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [album, setAlbum] = useState("");
  const [newAlbumName, setNewAlbumName] = useState("");
  const [albumsList, setAlbumsList] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [persisted, setPersisted] = useState([]);
  const thumbRef = useRef();

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
        const res = await axios.get("video-media/");
        const data = res.data;
        let items = [];
        if (Array.isArray(data)) items = data;
        else if (data && Array.isArray(data.results)) items = data.results;
        else if (data) items = [data];
        setPersisted(items.filter((i) => i));
      } catch (e) {
        console.error("Failed to load videos", e);
      }
    };
    fetch();
  }, []);

  // fetch albums from backend
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const res = await axios.get("albums/");
        const data = res.data;
        let arr = [];
        if (Array.isArray(data)) arr = data;
        else if (data && Array.isArray(data.results)) arr = data.results;
        else if (data) arr = [data];
        setAlbumsList(arr.map((a) => a.name).filter(Boolean));
      } catch (e) {
        console.error("Failed to load albums", e);
      }
    };
    fetchAlbums();
  }, [persisted]);

  const onThumbSelect = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setThumbnailFile(f);
    try {
      setThumbnailPreview(URL.createObjectURL(f));
    } catch (e) {
      setThumbnailPreview(null);
    }
  };

  const upload = async () => {
    if (!title || !videoUrl) {
      alert("Please provide a title and a video URL.");
      return;
    }
    const fd = new FormData();
    fd.append("title", title);
    fd.append("description", description);
    fd.append("album", album || "");
    fd.append("video_url", videoUrl);
    if (thumbnailFile) fd.append("thumbnail", thumbnailFile);

    try {
      const res = await axios.post("video-media/", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res && res.data) setPersisted((s) => [res.data, ...s]);
      // noop: albums are managed by backend
      // clear
      setTitle("");
      setDescription("");
      setAlbum("");
      setVideoUrl("");
      if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
      setThumbnailPreview(null);
      setThumbnailFile(null);
      if (thumbRef.current) thumbRef.current.value = null;
    } catch (e) {
      console.error("Video upload failed", e);
      alert("Upload failed");
    }
  };

  const deleteVideo = async (id) => {
    if (!confirm("Delete this video?")) return;
    try {
      await axios.delete(`video-media/${id}/`);
      setPersisted((s) => s.filter((x) => x.id !== id));
      // albums come from backend; refreshed via persisted dependency
    } catch (e) {
      console.error("Failed to delete video", e);
      alert("Delete failed");
    }
  };

  // albums available in select
  const albums = albumsList;

  const addAlbum = () => {
    // create album via backend
    const name = (newAlbumName || "").trim();
    if (!name) return;
    (async () => {
      try {
        const res = await axios.post("albums/", { name });
        if (res && res.data) {
          setAlbumsList((s) => [res.data.name, ...s]);
          setAlbum(res.data.name);
          setNewAlbumName("");
        }
      } catch (e) {
        console.error("Failed to create album", e);
        alert("Failed to create album");
      }
    })();
  };

  return (
    <div className="space-y-6">
      <div className="p-4 bg-white rounded shadow">
        <h3 className="text-lg font-semibold mb-3">Upload Video</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="col-span-2 border rounded px-2 py-1"
          />

          <div>
            <select
              value={album}
              onChange={(e) => setAlbum(e.target.value)}
              className="border rounded px-2 py-1 w-full"
            >
              <option value="">-- Select album --</option>
              {albums.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>

            <div className="mt-2 flex items-center gap-2">
              <input
                value={newAlbumName}
                onChange={(e) => setNewAlbumName(e.target.value)}
                placeholder="New album"
                className="border rounded px-2 py-1 flex-1"
              />
              <button
                onClick={addAlbum}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full border rounded px-2 py-1 mb-3"
          rows={3}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
          <input
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Video URL (YouTube or other)"
            className="w-full border rounded px-2 py-1"
          />

          <div className="flex items-center gap-3">
            <label className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded cursor-pointer">
              <input
                ref={thumbRef}
                type="file"
                accept="image/*"
                onChange={onThumbSelect}
                className="hidden"
              />
              Select thumbnail
            </label>
            <button
              onClick={upload}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save
            </button>
            {thumbnailPreview && (
              <div className="h-20 w-28 overflow-hidden rounded">
                <img
                  src={thumbnailPreview}
                  alt="thumb"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 bg-white rounded shadow">
        <h3 className="text-lg font-semibold mb-3">Saved Videos</h3>
        {persisted.length === 0 ? (
          <div className="text-sm text-slate-500">No videos yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {persisted.map((v) => (
              <div key={v.id} className="border rounded overflow-hidden">
                <div className="h-44 bg-black/5 flex items-center justify-center overflow-hidden">
                  {v.thumbnail ? (
                    <img
                      src={resolveImage(v.thumbnail)}
                      alt={v.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-sm text-slate-500">No thumbnail</div>
                  )}
                </div>
                <div className="p-3 flex items-start justify-between gap-3">
                  <div>
                    <div className="font-medium text-sm text-green-800">
                      {v.title}
                    </div>
                    <div className="text-xs text-slate-500">
                      {v.album || "-"}
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <button
                      onClick={() => deleteVideo(v.id)}
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
