import { useEffect, useState } from "react";
import axios from "axios";
import img1 from "../../assets/1.png";
import img2 from "../../assets/2.png";
import img3 from "../../assets/3.png";
import img4 from "../../assets/4.png";

// Executive Committee listing — data can come from admin API.
// The component attempts to GET `/api/executive-committee/` and falls
// back to static placeholders if the API is not ready yet.

const placeholder = [
  {
    id: "00001",
    name: "Saleh Mohammad Mobin",
    role: "Founder and President",
    photo: img1,
    badge: "Lifetime Member",
  },
  {
    id: "00002",
    name: "Md Arif",
    role: "Vice President",
    photo: img2,
    badge: "Lifetime Member",
  },
  {
    id: "00003",
    name: "Saidur Rahman Bhuigan",
    role: "General Secretary",
    photo: img3,
    badge: "Lifetime Member",
  },
  {
    id: "00004",
    name: "Kazi Mohammad Morade Alam",
    role: "Treasurer",
    photo: img4,
    badge: "Lifetime Member",
  },
];

export default function ExecutiveCommmittee() {
  const [members, setMembers] = useState(placeholder);

  useEffect(() => {
    let mounted = true;
    axios
      .get("/api/executive-committee/")
      .then((res) => {
        if (!mounted) return;
        // Expecting array of { id, name, role, photo, badge }
        if (Array.isArray(res.data) && res.data.length) setMembers(res.data);
      })
      .catch(() => {
        // keep placeholder if API not available
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
                  <p className="text-sm text-slate-500 mt-1">{m.role}</p>
                </div>

                <div className="mt-4">
                  <span className="inline-block bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
                    {m.badge}
                  </span>

                  <div className="text-sm text-slate-500 mt-2">ID: {m.id}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
