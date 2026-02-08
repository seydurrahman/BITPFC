import { Users, UserCheck, Briefcase, User, GraduationCap } from "lucide-react";

const stats = [
  { label: "Total Members", value: 580, icon: Users },
  { label: "Life Members", value: 50, icon: UserCheck },
  { label: "Professional Members", value: 200, icon: Briefcase },
  { label: "General Members", value: 250, icon: User },
  { label: "Student Members", value: 80, icon: GraduationCap },
];

export default function Members() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 py-4 mt-8">
      {/* Decorative big background icon (smaller + hidden on xs) */}
      <Users
        size={220}
        className="absolute -left-10 -top-10 opacity-10 text-white pointer-events-none hidden sm:block"
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 text-center text-white gap-4">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center border-r border-white/20 last:border-r-0 py-4"
            >
              {/* icon */}
              <Icon size={28} className="mb-2 text-white/90" />

              {/* number */}
              <h2 className="text-3xl font-bold text-pink-300">{item.value}</h2>

              {/* label */}
              <p className="mt-1 text-sm font-semibold tracking-wide">
                {item.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
