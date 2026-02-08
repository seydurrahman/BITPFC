import { useEffect, useState } from "react";
import axios from "../../../api/axios";

export default function MembershipCategory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: "",
    experiences: "",
    price: "",
    year_type: "",
    vote: false,
    is_active: true,
  });

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get("membership-categories/");
      const data = res.data || {};
      const list = Array.isArray(data) ? data : data.results || [];
      setItems(list);
    } catch (e) {
      console.error("Failed to load categories", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const resetForm = () => {
    setEditing(null);
    setForm({
      name: "",
      experiences: "",
      price: "",
      year_type: "",
      vote: false,
      is_active: true,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`membership-categories/${editing}/`, form);
      } else {
        await axios.post("membership-categories/", form);
      }
      await fetchItems();
      resetForm();
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  const handleEdit = (item) => {
    setEditing(item.id);
    setForm({
      name: item.name || "",
      experiences: item.experiences || "",
      price: item.price ?? "",
      year_type: item.year_type || "",
      vote: !!item.vote,
      is_active: !!item.is_active,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this category?")) return;
    try {
      await axios.delete(`membership-categories/${id}/`);
      await fetchItems();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Membership Categories</h2>

      <form
        onSubmit={handleSubmit}
        className="mb-6 bg-white p-4 rounded shadow"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <select
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-1 block w-full border rounded px-2 py-1 bg-white"
              required
            >
              <option value="">Select category</option>
              <option>Lifetime Member</option>
              <option>CXO Professional Member</option>
              <option>Professional Member</option>
              <option>Student Member</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Price</label>
            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              className="mt-1 block w-full border rounded px-2 py-1"
              type="number"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Year Type</label>
            <select
              name="year_type"
              value={form.year_type}
              onChange={handleChange}
              className="mt-1 block w-full border rounded px-2 py-1 bg-white"
            >
              <option value="">Select term</option>
              <option value="1 Year">1 Year</option>
              <option value="2 Year">2 Year</option>
              <option value="3 Year">3 Year</option>
              <option value="4 Year">4 Year</option>
              <option value="5 Year">5 Year</option>
              <option value="One time">One time</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <label className="block text-sm font-medium">
              Experiences / Description
            </label>
            <textarea
              name="experiences"
              value={form.experiences}
              onChange={handleChange}
              className="mt-1 block w-full border rounded px-2 py-1"
              rows={3}
            />
          </div>
          <div className="flex items-center gap-2">
            
            <input
              id="vote"
              name="vote"
              type="checkbox"
              checked={!!form.vote}
              onChange={handleChange}
            />
             <label htmlFor="vote" className="text-sm">
              Voting
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              id="is_active"
              name="is_active"
              type="checkbox"
              checked={!!form.is_active}
              onChange={handleChange}
            />
            <label htmlFor="is_active" className="text-sm">
              Active
            </label>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {editing ? "Update" : "Add"}
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-200 px-4 py-2 rounded"
          >
            Reset
          </button>
        </div>
      </form>

      <div className="bg-white rounded shadow overflow-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Year Type</th>
              <th className="px-4 py-2 text-left">Active</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="p-4">
                  Loading...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4">
                  No categories yet.
                </td>
              </tr>
            ) : (
              items.map((it) => (
                <tr key={it.id} className="border-t">
                  <td className="px-4 py-2">{it.name}</td>
                  <td className="px-4 py-2">{it.price}</td>
                  <td className="px-4 py-2">{it.year_type}</td>
                  <td className="px-4 py-2">{it.is_active ? "Yes" : "No"}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleEdit(it)}
                      className="text-sm text-blue-600 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(it.id)}
                      className="text-sm text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
