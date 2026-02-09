import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import withAdmin from "../settings/withAdmin";
import Logo from "../../assets/Logo.png";

function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [membersOpen, setMembersOpen] = useState(true);

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
          <img src={Logo} alt="Logo" className="h-14 rounded object-cover" />
        </div>

        <div className="relative border-2 border-blue-600 rounded-md">
          <button
            onClick={() => setOpen((s) => !s)}
            className="flex items-center gap-3 px-3 py-1 bg-white rounded-md border"
          >
            <div className="w-8 h-8 bg-slate-200 rounded-full" />
            <div className="text-sm text-slate-700 ">
              {user?.username || user?.email || "Admin"}
            </div>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow p-2 z-20">
              <div className="px-2 py-1 text-sm text-slate-700">
                {user?.username || user?.email}
              </div>
              <div className="border-t border-blue-600 mt-2 pt-2">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-2 py-1 text-sm text-red-600 hover:bg-orange-300 rounded"
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

            <div>
              <button
                onClick={() => setMembersOpen((s) => !s)}
                className="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-slate-100"
                aria-expanded={membersOpen}
                aria-controls="members-submenu"
              >
                <span>Members</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transform transition-transform ${membersOpen ? "rotate-90" : "rotate-0"}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 6a1 1 0 011.707-.707L13.414 11l-5.707 5.707A1 1 0 016 16V6z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {membersOpen && (
                <div
                  id="members-submenu"
                  className="ml-3 mt-1 flex flex-col gap-1"
                >
                  <Link
                    to="/admin/members/category"
                    className="px-3 py-1 rounded hover:bg-slate-100 text-sm"
                  >
                    Member Category
                  </Link>
                  <Link
                    to="/admin/members/registered"
                    className="px-3 py-1 rounded hover:bg-slate-100 text-sm"
                  >
                    Registered Members
                  </Link>
                  <Link
                    to="/admin/members/assign"
                    className="px-3 py-1 rounded hover:bg-slate-100 text-sm"
                  >
                    Assign Membership
                  </Link>
                </div>
              )}
            </div>
            <p className="px-3 py-2 rounded border-b-4 border-b-blue-600 text-black">
              Settings
            </p>

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
