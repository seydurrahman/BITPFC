import { useEffect, useState } from "react";
import axios from "../../../api/axios";

export default function RegisteredMembers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axios.get("users/");
        const data = res.data || {};
        const list = Array.isArray(data) ? data : data.results || [];
        if (mounted) setUsers(list);
      } catch (e) {
        console.error("Failed to fetch users", e);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchUsers();
    return () => (mounted = false);
  }, []);

  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Registered Members</h3>
      <div className="overflow-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Registration Date</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="p-4">
                  Loading...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-4">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id} className="border-t">
                  <td className="px-4 py-2">
                    {u.first_name || u.last_name
                      ? `${u.first_name || ""} ${u.last_name || ""}`.trim()
                      : u.username || "-"}
                  </td>
                  <td className="px-4 py-2">{u.phone || "-"}</td>
                  <td className="px-4 py-2">
                    {u.date_joined
                      ? new Date(u.date_joined).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-4 py-2">
                    {(u.membership_category && u.membership_category.name) ||
                      u.category ||
                      "-"}
                  </td>
                  <td className="px-4 py-2">
                    {u.is_active ? "Active" : "Inactive"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => alert("View user " + u.id)}
                      className="text-sm text-blue-600 mr-2"
                    >
                      View
                    </button>
                    <button
                      onClick={async () => {
                        if (confirm("Delete this user?")) {
                          try {
                            await axios.delete(`users/${u.id}/`);
                            setUsers(users.filter((x) => x.id !== u.id));
                          } catch (e) {
                            console.error(e);
                          }
                        }
                      }}
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
