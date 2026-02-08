import { useEffect, useState, useRef } from "react";
import axios from "../../../api/axios";

export default function AssignMember() {
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        const [uRes, cRes] = await Promise.all([
          axios.get("users/"),
          axios.get("membership-categories/"),
        ]);
        const uData = uRes.data || [];
        const cData = Array.isArray(cRes.data)
          ? cRes.data
          : cRes.data.results || [];
        if (mounted) {
          setUsers(uData);
          setCategories(cData);
        }
      } catch (e) {
        console.error("Failed to load members or categories", e);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchData();
    return () => (mounted = false);
  }, []);

  const filtered = users.filter((u) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    const name = `${u.first_name || ""} ${u.last_name || ""}`.toLowerCase();
    return (
      name.includes(q) ||
      (u.username || "").toLowerCase().includes(q) ||
      (u.email || "").toLowerCase().includes(q) ||
      (u.phone || "").toLowerCase().includes(q)
    );
  });

  const addMember = (user) => {
    // require mobile number before selecting/assigning
    if (!user.phone) {
      alert("Cannot select member without a mobile number. Please update the member's phone first.");
      setDropdownOpen(false);
      setSearch("");
      return;
    }
    if (!selectedMembers.find((m) => m.id === user.id)) {
      setSelectedMembers((s) => [...s, user]);
    }
    setSearch("");
    setDropdownOpen(false);
  };

  const removeMember = (id) =>
    setSelectedMembers((s) => s.filter((x) => x.id !== id));

  const assignCategory = async () => {
    if (!selectedCategory) return alert("Please select a category");
    if (selectedMembers.length === 0)
      return alert("Please select at least one member");
    setLoading(true);
    try {
      await Promise.all(
        selectedMembers.map((m) =>
          axios.patch(`users/${m.id}/`, {
            membership_category: selectedCategory,
          }),
        ),
      );
      // refresh users list
      const res = await axios.get("users/");
      setUsers(res.data || []);
      setSelectedMembers([]);
      setSelectedCategory("");
      alert("Assigned category successfully");
    } catch (e) {
      console.error(e);
      alert("Failed to assign category. Check console.");
    } finally {
      setLoading(false);
    }
  };

  // list of assigned members for the list page
  const assigned = users.filter((u) => u.membership_category);

  return (
    <div className="p-4">
      <h3 className="text-lg font-medium mb-4">Assign Member to Category</h3>

      <div className="mb-4">
        <label className="block text-sm mb-1">Select Member</label>
        <div ref={wrapperRef} className="relative">
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setDropdownOpen(true);
            }}
            onFocus={() => setDropdownOpen(true)}
            placeholder="Search members by name, username or email"
            className="w-full p-2 border rounded"
          />

          {dropdownOpen && (
            <div className="absolute z-20 mt-1 w-full max-h-60 overflow-auto bg-white border rounded shadow">
              {filtered.length === 0 ? (
                <div className="p-2 text-sm text-slate-500">No members</div>
              ) : (
                filtered.map((u) => (
                  <div
                    key={u.id}
                    className="p-2 hover:bg-slate-100 cursor-pointer"
                    onClick={() => addMember(u)}
                  >
                    <div className="text-sm font-medium">
                      {u.first_name || u.username} {u.last_name}
                    </div>
                    <div className="text-xs text-slate-500">
                      {u.phone || u.email || ""}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          {selectedMembers.map((m) => (
            <div
              key={m.id}
              className="flex items-center gap-2 bg-slate-100 px-2 py-1 rounded"
            >
              <span className="text-sm">
                {m.first_name || m.username} {m.last_name} {m.phone ? `(${m.phone})` : ""}
              </span>
              <button
                onClick={() => removeMember(m.id)}
                className="text-red-600 text-sm"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm mb-1">Select Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">-- choose category --</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} {c.price ? `- ${c.price}` : ""}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6 flex gap-2">
        <button
          onClick={assignCategory}
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-60"
        >
          {loading ? "Working..." : "Assign"}
        </button>
        <button
          onClick={() => {
            setSelectedMembers([]);
            setSelectedCategory("");
            setSearch("");
          }}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Clear
        </button>
      </div>

      <h4 className="text-md font-semibold mb-2">Assigned Members</h4>
      <div className="bg-white border rounded">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Joined</th>
            </tr>
          </thead>
          <tbody>
            {assigned.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-4 text-sm text-slate-500">
                  No assigned members
                </td>
              </tr>
            ) : (
              assigned.map((u) => (
                <tr key={u.id} className="border-t">
                  <td className="px-4 py-2">
                    {u.first_name || u.username} {u.last_name}
                  </td>
                  <td className="px-4 py-2">{u.phone || "-"}</td>
                  <td className="px-4 py-2">
                    {(u.membership_category && u.membership_category.name) ||
                      "-"}
                  </td>
                  <td className="px-4 py-2">
                    {u.date_joined
                      ? new Date(u.date_joined).toLocaleDateString()
                      : "-"}
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
