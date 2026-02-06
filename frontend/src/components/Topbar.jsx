import { useEffect, useState } from "react";

const Topbar = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 50) {
        setVisible(true);
      } else if (y > lastY) {
        // scrolling down -> hide topbar
        setVisible(false);
      } else {
        // scrolling up -> show
        setVisible(true);
      }
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      id="topbar"
      className={`bg-white/60 dark:bg-slate-900/60 border-b border-gray-100 dark:border-slate-800 overflow-hidden transition-all duration-200 ease-in-out ${
        visible ? "max-h-28 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div className="max-w-7xl bg-blue-500 mx-auto flex items-center justify-between px-2 py-1 text-sm text-slate-700 dark:text-slate-300 rounded-md">
        <div className="flex-1 pr-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center bg-brand text-red-600 px-3 py-1 rounded-md text-lg font-bold">
              Notice:
            </span>
            <div className="relative overflow-hidden w-full flex justify-center">
              <div className="animate-bouncePause whitespace-nowrap text-2xl text-white dark:text-slate-200">
                The member registration is going on!
              </div>
            </div>
          </div>
        </div>

        <div className="flex-shrink-0">
          <a href="/login" className="mr-4 hover:text-brand-600 text-white font-bold text-lg">
            Login
          </a>
          <a href="/register" className="hover:text-brand-600 text-white font-bold text-lg">
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
