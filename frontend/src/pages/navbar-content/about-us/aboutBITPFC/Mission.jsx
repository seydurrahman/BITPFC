import { Link, useLocation } from "react-router-dom";
import { Target, Eye } from "lucide-react";

function Mission() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <section className="max-w-7xl mx-auto py-12 pb-60 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <aside className="md:col-span-1 border rounded bg-white dark:bg-slate-800 shadow-md">
          <nav className="sticky top-24">
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about/mission"
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                    isActive("/about/mission")
                      ? "bg-sky-100 dark:bg-slate-700 font-semibold"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <Target size={18} className="text-blue-600" />
                  <span>Mission</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/about/vision"
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                    isActive("/about/vision")
                      ? "bg-sky-100 dark:bg-slate-700 font-semibold"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <Eye size={18} className="text-purple-600" />
                  <span>Vision</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/about/goal"
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                    isActive("/about/goal")
                      ? "bg-sky-100 dark:bg-slate-700 font-semibold"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <Target size={18} className="text-green-600" />
                  <span>Goal</span>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        <div className="md:col-span-2 bg-white dark:bg-slate-800 rounded p-6 shadow">
          <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
          <p className="text-slate-700 dark:text-slate-200">
            To empower IT professionals through knowledge sharing, networking,
            and continuous learning. We aim to build a collaborative community
            that drives innovation, supports professional growth, and fosters
            ethical and inclusive technological advancement.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Mission;
