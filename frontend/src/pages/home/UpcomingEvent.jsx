import { useMemo } from "react";

export default function UpcomingEvents() {
  const today = new Date();

  /* ===== Calendar Logic ===== */
  const calendar = useMemo(() => {
    const year = today.getFullYear();
    const month = today.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];

    // empty cells before month start
    for (let i = 0; i < firstDay; i++) days.push(null);

    // actual days
    for (let d = 1; d <= daysInMonth; d++) days.push(d);

    return days;
  }, [today]);

  const monthName = today.toLocaleString("default", { month: "long" });
  const year = today.getFullYear();

  /* ===== UI ===== */
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Title */}
        <h1 className="text-4xl font-bold mb-12 text-start text-slate-800">
          Upcoming Events
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* LEFT — Event Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
              alt="Event"
              className="w-full h-60 object-cover"
            />

            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-3">
                Knowledge Sharing Session
              </h3>

              <p className="text-slate-600 leading-relaxed">
                Join our monthly knowledge sharing program where IT
                professionals discuss modern technologies, real-life industry
                challenges, and networking opportunities. Grow your skills and
                expand your professional connections.
              </p>

              <button className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
                View Details
              </button>
            </div>
          </div>

          {/* RIGHT — Calendar */}
          <div className="bg-white rounded-2xl shadow-lg p-6">

            {/* Month Header */}
            <h3 className="text-lg font-semibold text-center mb-6">
              {monthName} {year}
            </h3>

            {/* Week days */}
            <div className="grid grid-cols-7 text-center text-sm font-semibold text-slate-500 mb-3">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>

            {/* Dates */}
            <div className="grid grid-cols-7 gap-2 text-center">
              {calendar.map((day, i) => (
                <div
                  key={i}
                  className={`py-2 rounded-lg
                    ${day === today.getDate()
                      ? "bg-blue-600 text-white font-bold"
                      : "text-slate-700"}
                  `}
                >
                  {day || ""}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
