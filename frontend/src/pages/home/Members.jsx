import { Users, UserCheck, Briefcase, User, GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "../../api/axios";

export default function Members() {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await axios.get("website-info/");
        let data = res.data;

        if (Array.isArray(data)) {
          data = data.length ? data[0] : {};
        } else if (
          data &&
          data.name &&
          data.value &&
          Object.keys(data).length === 2
        ) {
          const obj = {};
          obj[data.name] = data.value;
          data = obj;
        }

        if (mounted) setInfo(data || {});
      } catch (e) {
        console.error("Failed to load website-info", e);
        if (mounted) setInfo({});
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetch();
    return () => (mounted = false);
  }, []);

  const toNumber = (v) => {
    if (v === null || v === undefined || v === "") return 0;
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  };

  const totals = {
    total: toNumber(
      info?.total_members ??
        info?.totalMembers ??
        info?.total ??
        info?.["Total Members"],
    ),
    life: toNumber(
      info?.life_members ??
        info?.lifeMembers ??
        info?.life ??
        info?.["Life Members"],
    ),
    professional: toNumber(
      info?.professional_members ??
        info?.professionalMembers ??
        info?.professional ??
        info?.["Professional Members"],
    ),
    general: toNumber(
      info?.general_members ??
        info?.generalMembers ??
        info?.general ??
        info?.["General Members"],
    ),
    student: toNumber(
      info?.student_members ??
        info?.studentMembers ??
        info?.student ??
        info?.["Student Members"],
    ),
  };

  const stats = [
    { label: "Total Members", value: totals.total, icon: Users },
    { label: "Life Members", value: totals.life, icon: UserCheck },
    {
      label: "Professional Members",
      value: totals.professional,
      icon: Briefcase,
    },
    { label: "General Members", value: totals.general, icon: User },
    { label: "Student Members", value: totals.student, icon: GraduationCap },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 py-4 mt-8">
      {/* Decorative big background icon (smaller + hidden on xs) */}
      <Users
        size={220}
        className="absolute -left-10 -top-10 opacity-10 text-white pointer-events-none hidden sm:block"
      />

      <div className="relative max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 text-center text-white gap-4">
        {loading ? (
          <div className="col-span-2 md:col-span-5 text-center py-8">
            Loading…
          </div>
        ) : (
          stats.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center border-r border-white/20 last:border-r-0 py-4"
              >
                <Icon size={28} className="mb-2 text-white/90" />
                <h2 className="text-3xl font-bold text-pink-300">
                  {item.value}
                </h2>
                <p className="mt-1 text-sm font-semibold tracking-wide">
                  {item.label}
                </p>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
