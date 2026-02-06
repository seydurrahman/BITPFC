import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const Registration = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
    phone: "",
    organization: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        username: form.username,
        email: form.email,
        password: form.password,
        phone: form.phone,
        organization: form.organization,
      };
      const res = await api.post("auth/register/", payload);
      setSuccess(
        res.data?.message || "Registration successful. Redirecting to login...",
      );
      setForm({
        username: "",
        email: "",
        password: "",
        confirm: "",
        phone: "",
        organization: "",
      });
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          err.response?.data ||
          err.message ||
          "Registration failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[72vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="hidden md:flex flex-col justify-center rounded-lg p-8 bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-lg">
          <h3 className="text-3xl font-bold mb-3">Welcome to BITPFC</h3>
          <p className="opacity-90 mb-6">
            Connect, learn and grow with IT professionals. Register to access
            events, resources, and member benefits.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="bg-white/20 p-2 rounded-full">🚀</span>
              <span>Exclusive events & webinars</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-white/20 p-2 rounded-full">📚</span>
              <span>Study materials & guides</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-white/20 p-2 rounded-full">🤝</span>
              <span>Professional networking</span>
            </li>
          </ul>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-1 text-slate-800 dark:text-slate-100">
            Create your account
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
            Sign up to access member-only content and events.
          </p>

          {error && <div className="mb-4 text-sm text-red-600">{error}</div>}
          {success && (
            <div className="mb-4 text-sm text-green-600">{success}</div>
          )}

          <form onSubmit={submit} className="grid grid-cols-1 gap-3">
            <div>
              <label className="block text-sm text-slate-700 dark:text-slate-300">
                Full name
              </label>
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                placeholder="Your full name"
                className="mt-1 block w-full rounded-md border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-3"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-700 dark:text-slate-300">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="mt-1 block w-full rounded-md border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-3"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
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
                  placeholder="Strong password"
                  className="mt-1 block w-full rounded-md border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-3"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-700 dark:text-slate-300">
                  Confirm
                </label>
                <input
                  name="confirm"
                  type="password"
                  value={form.confirm}
                  onChange={handleChange}
                  required
                  placeholder="Repeat password"
                  className="mt-1 block w-full rounded-md border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-3"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-slate-700 dark:text-slate-300">
                  Phone
                </label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Optional"
                  className="mt-1 block w-full rounded-md border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-3"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-700 dark:text-slate-300">
                  Organization
                </label>
                <input
                  name="organization"
                  value={form.organization}
                  onChange={handleChange}
                  placeholder="Company or institute"
                  className="mt-1 block w-full rounded-md border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-3"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-2 bg-gradient-to-r from-sky-600 to-indigo-600 text-white rounded-md shadow-lg hover:from-sky-700 hover:to-indigo-700 disabled:opacity-60"
            >
              {loading ? "Registering…" : "Create account"}
            </button>

            <div className="text-center text-sm text-slate-600 dark:text-slate-300">
              Already a member?{" "}
              <a
                href="/login"
                className="text-sky-600 dark:text-sky-400 font-medium"
              >
                Sign in
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Registration;
