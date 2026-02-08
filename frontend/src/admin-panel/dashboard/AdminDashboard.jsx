import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import withAdmin from "../settings/withAdmin";
import Logo from "../../assets/Logo.png";

function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await axios.get("user/");
        if (mounted) setUser(res.data || null);
      } catch (e) {
        // ignore; user may be unauthenticated
        if (mounted) setUser(null);
      }
    })();
    return () => (mounted = false);
  }, []);

  const handleLogout = () => {
    const ok = window.confirm("Are you sure you want to log out?");
    if (!ok) return;
    try {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    } catch (e) {
      // ignore
    }
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="flex items-center justify-between px-6 py-3 bg-white border-b">
        <div className="flex items-center gap-3">
          <img
            src={Logo}
            alt="Logo"
            className="h-14 rounded object-cover"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setOpen((s) => !s)}
            className="flex items-center gap-3 px-3 py-1 bg-white rounded-md border"
          >
            <div className="w-8 h-8 bg-slate-200 rounded-full" />
            <div className="text-sm text-slate-700">
              {user?.username || user?.email || "Admin"}
            </div>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow p-2 z-20">
              <div className="px-2 py-1 text-sm text-slate-700">
                {user?.username || user?.email}
              </div>
              <div className="border-t mt-2 pt-2">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-2 py-1 text-sm text-red-600 hover:bg-slate-50 rounded"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="w-64 bg-white border-r p-4">
          <nav className="flex flex-col gap-2">
            <Link to="/admin" className="px-3 py-2 rounded hover:bg-slate-100">
              Admin Dashboard
            </Link>
            
            <Link
              to="/admin/members"
              className="px-3 py-2 rounded hover:bg-slate-100"
            >
              Members
            </Link>
            <Link
              to="/admin/settings"
              className="px-3 py-2 rounded hover:bg-slate-100 bg-blue-600 text-white"
            >
              Settings
            </Link>
            <Link
              to="/admin/settings/banner"
              className="px-3 py-2 rounded hover:bg-slate-100"
            >
              Banners
            </Link>
          </nav>
        </aside>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default withAdmin(AdminDashboard);
