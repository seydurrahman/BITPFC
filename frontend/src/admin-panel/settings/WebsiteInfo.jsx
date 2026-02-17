import { useEffect, useState } from "react";
import axios from "../../api/axios";

export default function WebsiteInfo() {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchInfo = async () => {
      setLoading(true);
      try {
        const res = await axios.get("website-info/");
        let data = res.data;

        // Normalize different response shapes
        // 1) { name, value }
        // 2) [{ name, value }, ...]
        // 3) object with model fields (phone_number, email, ...)
        if (Array.isArray(data)) {
          // if backend returns model instances as list, pick the first
          if (
            data.length > 0 &&
            data[0] &&
            (data[0].phone_number !== undefined || data[0].email !== undefined)
          ) {
            data = data[0];
          } else {
            const obj = {};
            data.forEach((item) => {
              if (item && item.name) obj[item.name] = item.value;
            });
            data = obj;
          }
        } else if (
          data &&
          data.name &&
          data.value &&
          Object.keys(data).length === 2
        ) {
          // single name/value
          const obj = {};
          obj[data.name] = data.value;
          data = obj;
        }

        if (mounted) setInfo(data);
      } catch (e) {
        if (mounted) setError(e.message || String(e));
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchInfo();
    return () => (mounted = false);
  }, []);

  // editing form state and save logic must be declared before any early returns
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    id: null,
    phone_number: "",
    email: "",
    address: "",
    facebook_url: "",
    linkedin_url: "",
    twitter_url: "",
    youtube_url: "",
    total_members: 0,
    life_members: 0,
    professional_members: 0,
    student_members: 0,
    general_members: 0,
  });

  // keep form in sync when info changes (e.g., after save)
  useEffect(() => {
    if (!info) return;
    const toNumber = (v) => {
      if (v === null || v === undefined || v === "") return 0;
      const n = Number(v);
      return Number.isFinite(n) ? n : 0;
    };

    const total_members = toNumber(
      info.total_members ??
        info.totalMembers ??
        info.total ??
        info["Total Members"],
    );
    const life_members = toNumber(
      info.life_members ??
        info.lifeMembers ??
        info.life ??
        info["Life Members"],
    );
    const professional_members = toNumber(
      info.professional_members ??
        info.professionalMembers ??
        info.professional ??
        info["Professional Members"],
    );
    const student_members = toNumber(
      info.student_members ??
        info.studentMembers ??
        info.student ??
        info["Student Members"],
    );
    const general_members = toNumber(
      info.general_members ??
        info.generalMembers ??
        info.general ??
        info["General Members"],
    );

    setForm({
      id: info.id || null,
      phone_number: info.phone_number || "",
      email: info.email || "",
      address: info.address || "",
      facebook_url: info.facebook_url || "",
      linkedin_url: info.linkedin_url || "",
      twitter_url: info.twitter_url || "",
      youtube_url: info.youtube_url || "",
      total_members: total_members || 0,
      life_members: life_members || 0,
      professional_members: professional_members || 0,
      student_members: student_members || 0,
      general_members: general_members || 0,
    });
  }, [info]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        phone_number: form.phone_number || null,
        email: form.email || null,
        address: form.address || null,
        facebook_url: form.facebook_url || null,
        linkedin_url: form.linkedin_url || null,
        twitter_url: form.twitter_url || null,
        youtube_url: form.youtube_url || null,
        total_members: Number(form.total_members) || 0,
        life_members: Number(form.life_members) || 0,
        professional_members: Number(form.professional_members) || 0,
        student_members: Number(form.student_members) || 0,
        general_members: Number(form.general_members) || 0,
      };

      if (form.id) {
        await axios.put(`website-info/${form.id}/`, payload);
      } else {
        await axios.post(`website-info/`, payload);
      }

      // refetch
      const res = await axios.get("website-info/");
      let d = res.data;
      if (Array.isArray(d)) d = d.length ? d[0] : null;
      setInfo(d);
      setEditing(false);
    } catch (e) {
      alert("Save failed: " + (e.response?.data || e.message || e));
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return <div className="p-4 text-sm text-slate-600">Loading…</div>;
  if (error)
    return <div className="p-4 text-sm text-red-600">Error: {error}</div>;
  if (!info && !editing)
    return (
      <div className="p-4 bg-white rounded shadow">
        <div className="text-sm text-slate-600 mb-3">
          No website info available.
        </div>
        <button
          onClick={() => setEditing(true)}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          Add
        </button>
      </div>
    );

  // use info if present, otherwise use current form values while editing
  const infoData = info || form;

  // common fields fallbacks
  const phone =
    infoData.phone_number || infoData.phone || infoData["Phone"] || "-";
  const email =
    infoData.email || infoData["Email"] || infoData["email_address"] || "-";
  const address = infoData.address || infoData["Address"] || "-";
  const facebook = infoData.facebook_url || infoData.facebook || "";
  const linkedin = infoData.linkedin_url || infoData.linkedin || "";
  const twitter = infoData.twitter_url || infoData.twitter || "";
  const youtube = infoData.youtube_url || infoData.youtube || "";

  const toNumber = (v) => {
    if (v === null || v === undefined || v === "") return 0;
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  };

  const total_members = toNumber(
    infoData.total_members ??
      infoData.totalMembers ??
      infoData.total ??
      infoData["Total Members"],
  );
  const life_members = toNumber(
    infoData.life_members ??
      infoData.lifeMembers ??
      infoData.life ??
      infoData["Life Members"],
  );
  const professional_members = toNumber(
    infoData.professional_members ??
      infoData.professionalMembers ??
      infoData.professional ??
      infoData["Professional Members"],
  );
  const student_members = toNumber(
    infoData.student_members ??
      infoData.studentMembers ??
      infoData.student ??
      infoData["Student Members"],
  );
  const general_members = toNumber(
    infoData.general_members ??
      infoData.generalMembers ??
      infoData.general ??
      infoData["General Members"],
  );

  return (
    <div className="p-6 bg-white rounded shadow space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Website Info</h2>
        <div className="flex items-center gap-2">
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="px-3 py-1 bg-blue-600 text-white rounded"
            >
              Edit
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                disabled={saving}
                className={`px-3 py-1 rounded ${saving ? "bg-gray-300 text-slate-600" : "bg-green-600 text-white"}`}
              >
                {saving ? "Saving…" : "Save"}
              </button>
              <button
                onClick={() => setEditing(false)}
                className="px-3 py-1 bg-gray-200 text-slate-700 rounded"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="text-xs text-slate-500">Phone</div>
          {editing ? (
            <input
              className="w-full border rounded px-2 py-1"
              value={form.phone_number}
              onChange={(e) =>
                setForm((s) => ({ ...s, phone_number: e.target.value }))
              }
            />
          ) : (
            <div className="text-sm text-slate-800">{phone}</div>
          )}
        </div>

        <div>
          <div className="text-xs text-slate-500">Email</div>
          {editing ? (
            <input
              className="w-full border rounded px-2 py-1"
              value={form.email}
              onChange={(e) =>
                setForm((s) => ({ ...s, email: e.target.value }))
              }
            />
          ) : (
            <div className="text-sm text-slate-800">{email}</div>
          )}
        </div>

        <div className="md:col-span-2">
          <div className="text-xs text-slate-500">Address</div>
          {editing ? (
            <textarea
              className="w-full border rounded px-2 py-1"
              value={form.address}
              onChange={(e) =>
                setForm((s) => ({ ...s, address: e.target.value }))
              }
            />
          ) : (
            <div className="text-sm text-slate-800 whitespace-pre-wrap">
              {address}
            </div>
          )}
        </div>

        <div>
          <div className="text-xs text-slate-500">Facebook</div>
          {editing ? (
            <input
              className="w-full border rounded px-2 py-1"
              value={form.facebook_url}
              onChange={(e) =>
                setForm((s) => ({ ...s, facebook_url: e.target.value }))
              }
            />
          ) : (
            <div className="text-sm text-blue-600">{facebook || "-"}</div>
          )}
        </div>

        <div>
          <div className="text-xs text-slate-500">LinkedIn</div>
          {editing ? (
            <input
              className="w-full border rounded px-2 py-1"
              value={form.linkedin_url}
              onChange={(e) =>
                setForm((s) => ({ ...s, linkedin_url: e.target.value }))
              }
            />
          ) : (
            <div className="text-sm text-blue-600">{linkedin || "-"}</div>
          )}
        </div>

        <div>
          <div className="text-xs text-slate-500">Twitter</div>
          {editing ? (
            <input
              className="w-full border rounded px-2 py-1"
              value={form.twitter_url}
              onChange={(e) =>
                setForm((s) => ({ ...s, twitter_url: e.target.value }))
              }
            />
          ) : (
            <div className="text-sm text-blue-600">{twitter || "-"}</div>
          )}
        </div>

        <div>
          <div className="text-xs text-slate-500">YouTube</div>
          {editing ? (
            <input
              className="w-full border rounded px-2 py-1"
              value={form.youtube_url}
              onChange={(e) =>
                setForm((s) => ({ ...s, youtube_url: e.target.value }))
              }
            />
          ) : (
            <div className="text-sm text-blue-600">{youtube || "-"}</div>
          )}
        </div>
      </div>

      <div className="pt-4 border-t">
        <h3 className="text-lg font-medium">Member Counts</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-3">
          <div className="text-sm">
            <div className="text-xs text-slate-500">Total Members</div>
            {editing ? (
              <input
                type="number"
                className="w-full border rounded px-2 py-1"
                value={form.total_members}
                onChange={(e) =>
                  setForm((s) => ({ ...s, total_members: e.target.value }))
                }
              />
            ) : (
              <div className="text-lg font-semibold">{total_members}</div>
            )}
          </div>

          <div className="text-sm">
            <div className="text-xs text-slate-500">Life Members</div>
            {editing ? (
              <input
                type="number"
                className="w-full border rounded px-2 py-1"
                value={form.life_members}
                onChange={(e) =>
                  setForm((s) => ({ ...s, life_members: e.target.value }))
                }
              />
            ) : (
              <div className="text-lg font-semibold">{life_members}</div>
            )}
          </div>

          <div className="text-sm">
            <div className="text-xs text-slate-500">Professional Members</div>
            {editing ? (
              <input
                type="number"
                className="w-full border rounded px-2 py-1"
                value={form.professional_members}
                onChange={(e) =>
                  setForm((s) => ({
                    ...s,
                    professional_members: e.target.value,
                  }))
                }
              />
            ) : (
              <div className="text-lg font-semibold">
                {professional_members}
              </div>
            )}
          </div>

          <div className="text-sm">
            <div className="text-xs text-slate-500">General Members</div>
            {editing ? (
              <input
                type="number"
                className="w-full border rounded px-2 py-1"
                value={form.general_members}
                onChange={(e) =>
                  setForm((s) => ({ ...s, general_members: e.target.value }))
                }
              />
            ) : (
              <div className="text-lg font-semibold">{general_members}</div>
            )}
          </div>

          <div className="text-sm">
            <div className="text-xs text-slate-500">Student Members</div>
            {editing ? (
              <input
                type="number"
                className="w-full border rounded px-2 py-1"
                value={form.student_members}
                onChange={(e) =>
                  setForm((s) => ({ ...s, student_members: e.target.value }))
                }
              />
            ) : (
              <div className="text-lg font-semibold">{student_members}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
