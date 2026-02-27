import { useEffect, useState } from "react";
import axios from "../../api/axios";

import img1 from "../../assets/Executive-Committee/1.png";
import img2 from "../../assets/Executive-Committee/2.png";
import img3 from "../../assets/Executive-Committee/3.png";
import img4 from "../../assets/Executive-Committee/4.png";

const placeholderImages = [img1, img2, img3, img4];

export default function ExecutiveCommittee() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const backendOrigin = (axios.defaults.baseURL || "")
      .replace(/\/api\/?$/, "")
      .replace(/\/$/, "");

    const resolvePhoto = (photo, index) => {
      if (!photo) return placeholderImages[index % 4];

      if (typeof photo === "object" && photo.url) photo = photo.url;
      if (typeof photo !== "string") return placeholderImages[index % 4];

      if (/^https?:\/\//.test(photo)) return photo;

      const cleaned = photo.replace(/^\//, "");
      return `${backendOrigin}/${cleaned}`;
    };

    const fetchMembers = async () => {
      try {
        const res = await axios.get("assign-memberships/");
        if (!mounted) return;

        if (!Array.isArray(res.data)) {
          setMembers([]);
          setLoading(false);
          return;
        }

        const registered = res.data
          .filter((m) => m.member_id)
          .sort((a, b) => {
            const na =
              parseInt((a.member_id || "").replace(/\D/g, ""), 10) || 0;
            const nb =
              parseInt((b.member_id || "").replace(/\D/g, ""), 10) || 0;
            return na - nb;
          });

        const mapped = registered.map((item, index) => {
          const user = item.user_detail || {};

          return {
            id: user.id || item.id,
            name: `${user.first_name || user.username || ""} ${
              user.last_name || ""
            }`.trim(),
            designation: item.designation || item.committee_type || "",
            photo: resolvePhoto(
              user.photography_url || user.photography,
              index
            ),
            badge:
              item.membership_category_name ||
              user.membership_category?.name ||
              "Member",
            member_id: item.member_id || "",
          };
        });

        setMembers(mapped);
      } catch (error) {
        console.error("Failed to load committee members:", error);
        setMembers([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchMembers();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="w-full py-14 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-blue-800 mb-12">
          EXECUTIVE COMMITTEE 2026-2027
        </h2>

        {loading ? (
          <div className="text-center text-gray-500 py-20">
            Loading committee members...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {members.map((m, index) => (
              <div
                key={m.id}
                className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl opacity-0 animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-72 w-full overflow-hidden bg-gray-100">
                  <img
                    src={m.photo}
                    alt={m.name}
                    onError={(e) => {
                      e.currentTarget.src =
                        placeholderImages[index % 4];
                    }}
                    className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                  />
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">
                      {m.name}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      {m.designation}
                    </p>
                  </div>

                  <div className="mt-4">
                    <span className="inline-block bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                      {m.badge}
                    </span>

                    <div className="text-xs text-slate-500 mt-2">
                      Member ID: {m.member_id || m.id}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fade animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.6s ease forwards;
          }
        `}
      </style>
    </section>
  );
}