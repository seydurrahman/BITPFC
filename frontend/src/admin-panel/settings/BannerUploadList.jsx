import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import withAdmin from "./withAdmin";

function BannerUploadList() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState({
    next: null,
    previous: null,
    count: 0,
  });
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", image: null });
  const [editingId, setEditingId] = useState(null);

  const fetchBanners = async (url = "banners/") => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      const data = res.data || {};
      // Handle paginated responses (DRF) which return { results, next, previous, count }
      if (Array.isArray(data)) {
        setBanners(data);
        setPageInfo({ next: null, previous: null, count: data.length });
      } else {
        setBanners(data.results || []);
        setPageInfo({
          next: data.next || null,
          previous: data.previous || null,
          count: data.count || 0,
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm((s) => ({ ...s, image: files[0] }));
    } else {
      setForm((s) => ({ ...s, [name]: value }));
    }
  };

  const resetForm = () => {
    setForm({ title: "", description: "", image: null });
    setEditingId(null);
    setShowForm(false);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("description", form.description);
      if (form.image) fd.append("image", form.image);

      if (editingId) {
        await axios.patch(`banners/${editingId}/`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post("banners/", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      await fetchBanners();
      resetForm();
    } catch (err) {
      console.error(err);
      alert("Failed to save banner");
    }
  };

  const startEdit = (b) => {
    setEditingId(b.id);
    setForm({
      title: b.title || "",
      description: b.description || "",
      image: null,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this banner?")) return;
    try {
      await axios.delete(`banners/${id}/`);
      await fetchBanners();
    } catch (e) {
      console.error(e);
      alert("Delete failed");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-semibold">Banners</h3>
        <div>
          <button
            onClick={() => {
              setShowForm((s) => !s);
              setEditingId(null);
              setForm({ title: "", description: "", image: null });
            }}
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            + Add Banner
          </button>
        </div>
      </div>

      {showForm && (
        <form
          onSubmit={submitForm}
          className="mb-4 p-4 bg-white rounded shadow"
        >
          <div className="grid grid-cols-1 gap-3">
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="Title"
              className="p-2 border rounded"
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              className="p-2 border rounded"
            />
            <input
              name="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
            />
            <div className="flex gap-2 mt-10">
              <button
                type="submit"
                className="px-3 py-1 bg-green-600 text-white rounded"
              >
                {editingId ? "Save" : "Upload"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}

      {!showForm && (
        <>
          <div className="grid gap-3">
            {loading && <div>Loading...</div>}
            {!loading && (!Array.isArray(banners) || banners.length === 0) && (
              <div>No banners yet.</div>
            )}
            {Array.isArray(banners) &&
              banners.map((b) => (
                <div
                  key={b.id}
                  className="flex items-center gap-4 p-3 bg-white rounded shadow"
                >
                  <img
                    src={b.image_url || b.image}
                    alt={b.title}
                    className=" h-40 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="font-bold">{b.title}</div>
                    <div className="text-sm text-gray-600">{b.description}</div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => startEdit(b)}
                      className="text-sm text-indigo-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(b.id)}
                      className="text-sm text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>

          {/* simple pagination controls */}
          {(pageInfo.next || pageInfo.previous) && (
            <div className="flex items-center justify-between mt-4">
              <div>
                Showing {banners.length} of {pageInfo.count}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => fetchBanners(pageInfo.previous)}
                  disabled={!pageInfo.previous}
                  className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                  Prev
                </button>
                <button
                  onClick={() => fetchBanners(pageInfo.next)}
                  disabled={!pageInfo.next}
                  className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default withAdmin(BannerUploadList);
