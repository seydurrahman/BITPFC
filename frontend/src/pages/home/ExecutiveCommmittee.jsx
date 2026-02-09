import { useEffect, useState } from "react";
import axios from "../../api/axios";
import img1 from "../../assets/Executive-Committee/1.png";
import img2 from "../../assets/Executive-Committee/2.png";
import img3 from "../../assets/Executive-Committee/3.png";
import img4 from "../../assets/Executive-Committee/4.png";

// Executive Committee listing — data can come from admin API.
// The component attempts to GET `/api/executive-committee/` and falls
// back to static placeholders if the API is not ready yet.

const placeholder = [
  {
    id: "00001",
    name: "Saleh Mohammad Mobin",
    designation: "Founder and President",
    photo: img1,
    badge: "Lifetime Member",
    member_id: "00001",
  },
  {
    id: "00002",
    name: "Md Arif",
    designation: "Vice President",
    photo: img2,
    badge: "Lifetime Member",
    member_id: "00002",
  },
  {
    id: "00003",
    name: "Saidur Rahman Bhuigan",
    designation: "General Secretary",
    photo: img3,
    badge: "Lifetime Member",
    member_id: "00003",
  },
  {
    id: "00004",
    name: "Kazi Mohammad Morade Alam",
    designation: "Treasurer",
    photo: img4,
    badge: "Lifetime Member",
    member_id: "00004",
  },
];

export default function ExecutiveCommmittee() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    let mounted = true;
    const imgs = [img1, img2, img3, img4];

    const backendOrigin = (() => {
      try {
        const b = axios.defaults.baseURL || "";
        return b.replace(/\/api\/?$/, "").replace(/\/$/, "");
      } catch (e) {
        return "";
      }
    })();

    const getPhotoUrl = (path) => {
      if (!path) return null;
      // accept object like { url: '...' }
      if (typeof path === "object" && path.url) path = path.url;
      if (typeof path !== "string") return null;
      if (/^https?:\/\//.test(path)) return path;
      // common Django media path handling:
      const cleaned = path.replace(/^\//, "");
      if (/^media\//.test(cleaned)) return `${backendOrigin}/${cleaned}`;
      // uploaded FileField often stores 'photos/...' — serve from /media/photos/...
      if (/^photos\//.test(cleaned)) return `${backendOrigin}/media/${cleaned}`;
      // if path already looks like it contains 'media' anywhere, use as-is
      if (/media\//.test(path)) return `${backendOrigin}/${cleaned}`;
      // fallback: relative to backend root
      return `${backendOrigin}/${cleaned}`;
    };

    const mapUser = (u) => {
      const memberKey = u.member_id || String(u.id || "");
      const photoField =
        u.photography ||
        u.photo ||
        u.photography_url ||
        u.photographyUrl ||
        u.photo_url ||
        "";
      const photoUrl = getPhotoUrl(photoField);
      // deterministic placeholder based on member id (or id) when no photo
      let placeholderImg = imgs[0];
      if (!photoUrl) {
        const num = parseInt((memberKey || "").replace(/\D/g, ""), 10);
        const idx =
          Number.isFinite(num) && num > 0
            ? num % imgs.length
            : (u.id || 0) % imgs.length;
        placeholderImg = imgs[idx];
      }

      return {
        id: u.id,
        name: `${u.first_name || u.username || ""} ${u.last_name || ""}`.trim(),
        designation: u.designation || u.committee_type || "",
        photo: photoUrl || placeholderImg,
        badge:
          (u.membership_category && u.membership_category.name) || "Member",
        member_id: u.member_id || "",
      };
    };

    axios
      .get("users/")
      .then(async (res) => {
        if (!mounted) return;
        if (!Array.isArray(res.data)) return;

        // Show only registered users (those with a member_id)
        const registered = res.data.filter((u) => u.member_id);
        if (registered.length) {
          // for users missing a photo field in the list endpoint, fetch detail
          const needDetail = registered.filter(
            (u) =>
              !u.photography && !u.photo && !u.photography_url && !u.photo_url,
          );

          if (needDetail.length) {
            await Promise.all(
              needDetail.map(async (u) => {
                try {
                  const detail = await axios.get(`users/${u.id}/`);
                  const d = detail.data || {};
                  // merge photography fields into the list user object
                  u.photography =
                    u.photography ||
                    d.photography ||
                    d.photo ||
                    d.photography_url ||
                    d.photo_url ||
                    u.photography;
                } catch (e) {
                  // ignore per-user fetch errors
                }
              }),
            );
          }

          // sort by numeric member_id (handles zero-padded IDs like "0001")
          registered.sort((a, b) => {
            const na =
              parseInt((a.member_id || "").replace(/\D/g, ""), 10) || 0;
            const nb =
              parseInt((b.member_id || "").replace(/\D/g, ""), 10) || 0;
            return na - nb;
          });

          setMembers(registered.map((u) => mapUser(u)));
          return;
        }

        // If no registered users, show empty list (no placeholder)
        setMembers([]);
      })
      .catch(() => {
        // On error, keep list empty
        setMembers([]);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="w-full py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-blue-800 mb-10">
          EXECUTIVE COMMITTEE 2026-2027
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {members.map((m) => (
            <div
              key={m.id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transform transition-transform duration-200 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="h-72 md:h-64 w-full overflow-hidden bg-gray-100 rounded-t-lg">
                <img
                  src={m.photo}
                  alt={m.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">
                    {m.name}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    {m.designation || ""}
                  </p>
                </div>

                <div className="mt-4">
                  <span className="inline-block bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
                    {m.badge}
                  </span>

                  <div className="text-sm text-slate-500 mt-2">
                    Member ID: {m.member_id || m.id}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
