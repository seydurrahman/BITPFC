import { useEffect, useState } from "react";
import axios from "../../../api/axios";

function MemberList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const fetchMembers = async () => {
      setLoading(true);
      try {
        // Public endpoint returning assigned membership objects with user_detail
        const res = await axios.get("assign-memberships/");
        if (!mounted) return;
        // response is an array of assignment objects
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.results || [];
        // map to a simpler members array based on user_detail
        const mapped = data
          .map((a) => ({
            id: a.id,
            user: a.user_detail || {},
            member_id: a.member_id,
            designation: a.designation,
            committee_type: a.committee_type,
            membership_category_name: a.membership_category_name,
          }))
          .filter((x) => x.user && x.user.id);

        // sort by numeric part of member_id (0001, 0002...), fallback to user.id
        const extractNumber = (s) => {
          if (!s) return null;
          const m = String(s).match(/(\d+)/);
          return m ? parseInt(m[1], 10) : null;
        };

        const sorted = mapped.slice().sort((a, b) => {
          const na = extractNumber(a.member_id);
          const nb = extractNumber(b.member_id);
          if (na != null && nb != null) return na - nb;
          if (na != null) return -1;
          if (nb != null) return 1;
          // final fallback: user id
          return (a.user.id || 0) - (b.user.id || 0);
        });

        setUsers(sorted);
      } catch (e) {
        console.error("Failed to load assigned memberships", e);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchMembers();
    return () => (mounted = false);
  }, []);

  const formatMemberId = (id) => {
    if (!id) return "";
    let s = String(id).trim();
    // If it already mentions ID or contains letters, leave as-is
    if (/\bID\b/i.test(s) || /[A-Za-z]/.test(s)) return s;
    return `ID ${s}`;
  };

  const [query, setQuery] = useState("");

  const filteredUsers = users.filter((a) => {
    const q = (query || "").trim().toLowerCase();
    if (!q) return true;
    const name =
      `${a.user.first_name || ""} ${a.user.last_name || ""}`.toLowerCase();
    const username = (a.user.username || "").toLowerCase();
    const designation = (a.designation || a.user.job_title || "").toLowerCase();
    const category = (
      a.membership_category_name ||
      a.user.membership_category?.name ||
      ""
    ).toLowerCase();
    const memberId = (a.member_id || "").toLowerCase();

    return (
      name.includes(q) ||
      username.includes(q) ||
      designation.includes(q) ||
      category.includes(q) ||
      memberId.includes(q)
    );
  });

  return (
    <div>
      <div className="w-full bg-blue-400">
        <div className="p-10 relative left-1/2 -translate-x-1/2 w-screen bg-blue-400">
          <h2 className="text-4xl text-white font-bold items-center flex flex-col justify-center">
            MEMBERSHIP
          </h2>
          <p className="text-red-500 text-xl items-center flex flex-col justify-center">
            Valued Members
          </p>
        </div>
      </div>
      {/* Need search option by name, designation, or membership category and ID */}

      <div className="w-full py-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-4">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, designation, category or ID"
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>
          {loading ? (
            <div className="text-center py-6">Loading members...</div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-8">No members found</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map((a) => (
                <div
                  key={a.id}
                  className="bg-white rounded-lg shadow p-6 flex gap-4 items-center"
                >
                  <div className="w-20 h-20 flex-shrink-0">
                    <img
                      src={
                        a.user.photography_url ||
                        "/assets/placeholder-avatar.png"
                      }
                      alt={a.user.username || a.user.first_name}
                      className="w-20 h-20 rounded-full object-cover object-top"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-lg font-semibold text-slate-800">
                      {a.user.first_name || a.user.username} {a.user.last_name}
                    </div>
                    <div className="text-sm text-slate-600">
                      {a.user.job_title ||
                        a.designation ||
                        a.user.organization ||
                        ""}
                      {a.user.company_name ? `, ${a.user.company_name}` : ""}
                    </div>
                    <div className="mt-2 text-sm text-slate-700 font-medium">
                      {a.member_id ? `${formatMemberId(a.member_id)}, ` : ""}
                      {a.membership_category_name ||
                        a.user.membership_category?.name ||
                        "Member"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MemberList;
