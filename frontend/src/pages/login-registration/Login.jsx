import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../api/axios";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const payload = { username: form.email, password: form.password };
      const res = await axios.post("token/", payload);
      const { access, refresh } = res.data || {};
      if (access) {
        localStorage.setItem("accessToken", access);
      }
      if (refresh) {
        localStorage.setItem("refreshToken", refresh);
      }

      // Fetch current user and redirect based on admin status
      try {
        const me = await axios.get("user/");
        const data = me.data || {};
        if (
          data.is_admin ||
          data.is_staff ||
          data.is_superuser ||
          data.role === "admin"
        ) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } catch (e) {
        // If fetching profile fails, fallback to home
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[70vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="hidden md:flex flex-col justify-center rounded-lg p-8 bg-gradient-to-br from-indigo-600 to-sky-500 text-white shadow-lg">
          <h3 className="text-3xl font-bold mb-2">Welcome back</h3>
          <p className="opacity-90 mb-6">
            Sign in to continue to your BITPFC account and access member
            resources.
          </p>
          <div className="mt-4">
            <Link
              to="/register"
              className="inline-block px-4 py-2 bg-white/20 rounded text-white"
            >
              Create account
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-100">
            Sign in
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
            Enter your credentials to access your account.
          </p>

          {error && <div className="mb-4 text-sm text-red-600">{error}</div>}

          <form onSubmit={submit} className="grid gap-3">
            <div>
              <label className="block text-sm text-slate-700 dark:text-slate-300">
                Email
              </label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-700 dark:text-slate-300">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                placeholder="Your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-2 bg-gradient-to-r from-indigo-600 to-sky-500 text-white rounded-md shadow-lg hover:from-indigo-700 hover:to-sky-600 disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>

            <div className="flex items-center justify-between mt-2 text-sm text-slate-600 dark:text-slate-300">
              <a href="#" className="hover:underline">
                Forgot password?
              </a>
              <Link
                to="/register"
                className="text-indigo-600 dark:text-indigo-400 font-medium"
              >
                Create account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
