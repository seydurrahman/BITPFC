import { useEffect, useState, useRef } from "react";
import Topbar from "./Topbar";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showTopbar, setShowTopbar] = useState(true);
  const topbarRef = useRef(null);
  const [topbarHeight, setTopbarHeight] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      // If scrolling down, hide topbar
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowTopbar(false);
      }
      // If scrolling up, show topbar
      else if (currentScrollY < lastScrollY) {
        setShowTopbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  useEffect(() => {
    const measure = () => {
      if (topbarRef.current)
        setTopbarHeight(topbarRef.current.getBoundingClientRect().height);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-slate-900 dark:text-white overflow-x-hidden">
      {/* Topbar with hide/show on scroll */}
      <div
        ref={topbarRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          showTopbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <Topbar />
      </div>

      {/* Fixed Navbar - always visible; pass topbarHeight so it can position below the Topbar when visible */}
      <Navbar topOffset={showTopbar ? topbarHeight : 0} />

      {/* Add padding-top to prevent content from hiding behind fixed navbar */}
      <main className="max-w-7xl mx-auto px-4 py-8 pt-36 md:pt-28">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
