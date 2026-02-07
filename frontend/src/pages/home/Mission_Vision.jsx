import { useEffect, useState } from "react";
import { Target, Eye } from "lucide-react";

export default function MissionVision() {
  const [active, setActive] = useState("mission");

  useEffect(() => {
    const hash = (window.location.hash || "").replace("#", "");
    if (hash && ["mission", "vision", "goal"].includes(hash)) {
      setActive(hash);
    }
  }, []);

  const select = (id) => {
    setActive(id);
    window.location.hash = id;
  };

  return (
    <section className="w-full py-16 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-14 text-slate-800 dark:text-white">
          Mission, Vision & Goal
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left nav */}
          <aside className="md:col-span-1">
            <nav className="sticky top-24 bg-transparent">
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => select("mission")}
                    className={`w-full text-left px-4 py-3 rounded-lg transition ${
                      active === "mission"
                        ? "bg-sky-100 dark:bg-slate-700 font-semibold"
                        : "hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Target size={18} className="text-blue-600" />
                      <span>Mission</span>
                    </div>
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => select("vision")}
                    className={`w-full text-left px-4 py-3 rounded-lg transition ${
                      active === "vision"
                        ? "bg-sky-100 dark:bg-slate-700 font-semibold"
                        : "hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Eye size={18} className="text-purple-600" />
                      <span>Vision</span>
                    </div>
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => select("goal")}
                    className={`w-full text-left px-4 py-3 rounded-lg transition ${
                      active === "goal"
                        ? "bg-sky-100 dark:bg-slate-700 font-semibold"
                        : "hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Target size={18} className="text-green-600" />
                      <span>Goal</span>
                    </div>
                  </button>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Right content */}
          <div className="md:col-span-2">
            <div className="bg-white dark:bg-slate-800 rounded p-8 shadow">
              {active === "mission" && (
                <div id="mission">
                  <h2 className="text-2xl font-semibold mb-4">Mission</h2>
                  <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
                    To empower IT professionals through knowledge sharing,
                    networking, and continuous learning. We aim to build a
                    collaborative community that drives innovation, supports
                    professional growth, and fosters ethical and inclusive
                    technological advancement.
                  </p>
                </div>
              )}

              {active === "vision" && (
                <div id="vision">
                  <h2 className="text-2xl font-semibold mb-4">Vision</h2>
                  <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
                    To become a leading platform where IT professionals connect,
                    collaborate, and lead the future of technology through
                    collaboration, innovation, and integrity. Our goal is to
                    advance hardware, software, cybersecurity, technology
                    students, and Bangladeshi IT professionals.
                  </p>
                </div>
              )}

              {active === "goal" && (
                <div id="goal">
                  <h2 className="text-2xl font-semibold mb-4">Goal</h2>
                  <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
                    To organize impactful events, provide career-enhancing
                    resources, and create opportunities that help members
                    achieve professional success.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
