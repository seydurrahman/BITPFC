// Add News
import React, { useState, useEffect, useRef } from "react";
import axios from "../../../api/axios";

export default function NewsRoomMedia() {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    description: "",
    news_link: "",
    image: null,
  });
  const [editingId, setEditingId] = useState(null);
  const fileRef = useRef(null);

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
    const fetchNews = async () => {
      try {
        const response = await axios.get("/news-room/");
        const data = response.data;
        if (Array.isArray(data)) setNewsItems(data);
        else if (data && Array.isArray(data.results))
          setNewsItems(data.results);
        else if (data) setNewsItems([data]);
        else setNewsItems([]);
      } catch (error) {
        console.error("Failed to fetch news items.", error);
        setNewsItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm((f) => ({ ...f, image: files && files[0] ? files[0] : null }));
      return;
    }
    setForm((f) => ({ ...f, [name]: value }));
  };

  const resetForm = () => {
    setForm({ title: "", description: "", news_link: "", image: null });
    setEditingId(null);
    if (fileRef.current) fileRef.current.value = null;
  };

  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("description", form.description);
    // ensure new items are active by default
    if (!editingId) fd.append("is_active", "true");
    if (form.news_link) fd.append("news_link", form.news_link);
    if (form.image instanceof File) fd.append("image", form.image);

    try {
      if (editingId) {
        await axios.patch(`/news-room/${editingId}/`, fd);
      } else {
        await axios.post(`/news-room/`, fd);
      }

      const res = await axios.get("/news-room/");
      const data = res.data;
      setNewsItems(Array.isArray(data) ? data : data.results || [data]);
      resetForm();
    } catch (err) {
      // Log detailed response from server (validation errors etc.)
      console.error("Failed to submit news item", err);
      if (err.response) {
        console.error("Response data:", err.response.data);
        console.error("Response status:", err.response.status);
      } else if (err.request) {
        console.error("No response received", err.request);
      } else {
        console.error("Error setting up request", err.message);
      }
    }
  };
  const editItem = (item) => {
    setEditingId(item.id);
    setForm({
      title: item.title || "",
      description: item.description || "",
      news_link: item.news_link || "",
      image: null,
    });
    if (fileRef.current) fileRef.current.value = null;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Delete this news item?")) return;
    try {
      await axios.delete(`/news-room/${id}/`);
      setNewsItems((s) => s.filter((n) => n.id !== id));
    } catch (err) {
      console.error("Failed to delete news item", err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">News Room (Admin)</h1>

      <form onSubmit={submit} className="mb-6 bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">
          {editingId ? "Edit" : "Add"} News
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm mb-1">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">News Link</label>
            <input
              name="news_link"
              value={form.news_link}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Image</label>
            <input
              ref={fileRef}
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <div className="flex items-end gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              {editingId ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Clear
            </button>
          </div>
        </div>
      </form>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full divide-y">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Date
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Image
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-2/4">
                News
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                Active
              </th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y">
            {newsItems.map((newsItem) => (
              <tr key={newsItem.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                  {(() => {
                    const dt = newsItem.created_at || newsItem.updated_at;
                    if (!dt) return "-";
                    try {
                      const d = new Date(dt);
                      return d.toLocaleDateString();
                    } catch (e) {
                      return dt.split("T")[0] || dt;
                    }
                  })()}
                </td>
                <td className="px-4 py-3 w-28">
                  {newsItem.image ? (
                    <img
                      src={resolveImage(newsItem.image)}
                      alt={newsItem.title}
                      className="w-20 h-12 object-cover rounded"
                    />
                  ) : (
                    <div className="w-20 h-12 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400">
                      No image
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 w-1/3 max-w-xs">
                  <div className="font-semibold text-gray-800 truncate">
                    {newsItem.title}
                  </div>
                  <div
                    className="text-sm text-gray-600"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {newsItem.description}
                  </div>
                </td>
                <td className="px-4 py-3 text-center text-sm">
                  {newsItem.is_active ? (
                    <span className="text-green-600 font-medium">Yes</span>
                  ) : (
                    <span className="text-red-600 font-medium">No</span>
                  )}
                </td>
                <td className="px-4 py-3 w-36 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => editItem(newsItem)}
                      className="text-sm px-2 py-1 bg-blue-600 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteItem(newsItem.id)}
                      className="text-sm px-2 py-1 bg-red-600 text-white rounded"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
