import { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../api/axios";

const Registration = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
    phone: "",
    organization: "",
    nid: "",
    gender: "",
    bloodGroup: "",
    dateOfBirth: "",
    photography: null,
    occupation: "",
    jobTitle: "",
    companyName: "",
    workStation: "",
    jobCategory: "",
    sector: "",
    workExperience: "",
    educationLevel: "",
    institute: "",
    passingYear: "",
    linkedInUrl: "",
    facebookUrl: "",
    twitterUrl: "",
    skills: [],
    certifications: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("id");
  const [isEdit, setIsEdit] = useState(false);

  const predefinedSkills = [
    "Software Development",
    "AI & Machine Learning",
    "Cyber Security",
    "Web Development",
    "Mobile App Development",
    "Software Testing",
    "Project Management",
    "Digital Marketing",
    "Blockchain Technology",
    "UX/UI",
  ];

  // The handleChange function remains unchanged
  const handleChange = (e) => {
    const { name, type, value, files, multiple, selectedOptions } = e.target;
    if (type === "file") {
      setForm({ ...form, [name]: files[0] });
      return;
    }

    if (multiple) {
      const values = Array.from(selectedOptions).map((o) => o.value);
      setForm({ ...form, [name]: values });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const toggleSkill = (val) => {
    if (form.skills.includes(val)) {
      setForm({ ...form, skills: form.skills.filter((s) => s !== val) });
    } else {
      setForm({ ...form, skills: [...form.skills, val] });
    }
  };

  const [skillsOpen, setSkillsOpen] = useState(false);
  const skillsRef = useRef(null);

  useEffect(() => {
    const onDocClick = (e) => {
      if (skillsRef.current && !skillsRef.current.contains(e.target)) {
        setSkillsOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => {
    let mounted = true;
    const fetchUser = async (id) => {
      try {
        const res = await api.get(`users/${id}/`);
        const u = res.data || {};
        if (!mounted) return;
        setIsEdit(true);
        setForm((prev) => ({
          ...prev,
          username: u.username || prev.username,
          email: u.email || prev.email,
          phone: u.phone || prev.phone,
          organization: u.organization || prev.organization,
          nid: u.nid || prev.nid,
          gender: u.gender || prev.gender,
          bloodGroup: u.blood_group || prev.bloodGroup,
          dateOfBirth: u.date_of_birth || u.dateOfBirth || prev.dateOfBirth,
          occupation: u.occupation || prev.occupation,
          jobTitle: u.job_title || prev.jobTitle,
          companyName: u.company_name || prev.companyName,
          workStation: u.work_station || prev.workStation,
          jobCategory: u.job_category || prev.jobCategory,
          sector: u.sector || prev.sector,
          workExperience: u.work_experience || prev.workExperience,
          educationLevel: u.education_level || prev.educationLevel,
          institute: u.institute || prev.institute,
          passingYear: u.passing_year || prev.passingYear,
          linkedInUrl: u.linked_in_url || prev.linkedInUrl,
          facebookUrl: u.facebook_url || prev.facebookUrl,
          twitterUrl: u.twitter_url || prev.twitterUrl,
          skills: Array.isArray(u.skills)
            ? u.skills
            : u.skills
              ? JSON.parse(u.skills)
              : prev.skills,
          certifications: u.certifications || prev.certifications,
        }));
      } catch (err) {
        console.error("Failed to fetch user for edit", err);
      }
    };

    if (editId) fetchUser(editId);
    return () => (mounted = false);
  }, [editId]);

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
      // build multipart form data so file upload works
      const fd = new FormData();
      fd.append("username", form.username);
      fd.append("email", form.email);
      if (!isEdit && form.password) fd.append("password", form.password);
      if (isEdit && form.password) fd.append("password", form.password);
      if (form.phone) fd.append("phone", form.phone);
      if (form.organization) fd.append("organization", form.organization);
      if (form.nid) fd.append("nid", form.nid);
      if (form.gender) fd.append("gender", form.gender);
      if (form.bloodGroup) fd.append("blood_group", form.bloodGroup);
      if (form.dateOfBirth) fd.append("dateOfBirth", form.dateOfBirth);
      if (form.occupation) fd.append("occupation", form.occupation);
      if (form.jobTitle) fd.append("job_title", form.jobTitle);
      if (form.companyName) fd.append("company_name", form.companyName);
      if (form.workStation) fd.append("work_station", form.workStation);
      if (form.jobCategory) fd.append("job_category", form.jobCategory);
      if (form.sector) fd.append("sector", form.sector);
      if (form.workExperience)
        fd.append("work_experience", form.workExperience);
      if (form.educationLevel)
        fd.append("education_level", form.educationLevel);
      if (form.institute) fd.append("institute", form.institute);
      if (form.passingYear) fd.append("passing_year", form.passingYear);
      if (form.linkedInUrl) fd.append("linked_in_url", form.linkedInUrl);
      if (form.facebookUrl) fd.append("facebook_url", form.facebookUrl);
      if (form.twitterUrl) fd.append("twitter_url", form.twitterUrl);
      if (form.certifications) fd.append("certifications", form.certifications);
      if (form.skills && form.skills.length)
        fd.append("skills", JSON.stringify(form.skills));
      if (form.photography) fd.append("photography", form.photography);

      let res;
      if (isEdit && editId) {
        // update existing user
        res = await api.patch(`users/${editId}/`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setSuccess(res.data?.message || "Update successful.");
        navigate("/admin/members/registered");
      } else {
        res = await api.post("auth/register/", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setSuccess(res.data?.message || "Registration successful.");
        setForm({
          username: "",
          email: "",
          password: "",
          confirm: "",
          phone: "",
          organization: "",
        });
        navigate("/login");
      }
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
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="hidden md:flex md:col-span-1 flex-col rounded-lg p-8 bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-lg">
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

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 md:col-span-2">
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
                  className="mt-1 block w-full rounded-md border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-3"
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
                  className="mt-1 block w-full rounded-md border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-3"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-700 dark:text-slate-300">
                  Phone
                </label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Optional"
                  className="mt-1 block w-full rounded-md border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-3"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
                  className="mt-1 block w-full rounded-md border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-3"
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
                  className="mt-1 block w-full rounded-md border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-3"
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
                  className="mt-1 block w-full rounded-md border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-3"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-sm text-slate-700 dark:text-slate-300">
                  NID Number
                </label>
                <input
                  name="nid"
                  value={form.nid}
                  onChange={handleChange}
                  placeholder="NID Number"
                  className="mt-1 block w-full rounded-md border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-3"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-700 dark:text-slate-300">
                  Gender
                </label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-3"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-700 dark:text-slate-300">
                  Blood Group
                </label>
                <select
                  name="bloodGroup"
                  value={form.bloodGroup}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-3"
                >
                  <option value="">Select blood group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-sm text-slate-700 dark:text-slate-300">
                  Date of Birth
                </label>
                <input
                  name="dateOfBirth"
                  type="date"
                  value={form.dateOfBirth}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-3"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-700 dark:text-slate-300">
                  Photography
                </label>
                <input
                  name="photography"
                  type="file"
                  accept=".png,.pdf,image/png,application/pdf"
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-3"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-700 dark:text-slate-300">
                  Occupation
                </label>
                <input
                  name="occupation"
                  value={form.occupation}
                  onChange={handleChange}
                  placeholder="Occupation"
                  className="mt-1 block w-full rounded-md border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-3"
                />
              </div>
            </div>

            {/* Professional Info */}
            <p className="text-xl underline">Professional Info</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-sm text-slate-700 dark:text-slate-300">
                  Job Title
                </label>
                <input
                  name="jobTitle"
                  value={form.jobTitle}
                  onChange={handleChange}
                  placeholder="Job Title"
                  className="mt-1 block w-full rounded-md border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-3"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-700 dark:text-slate-300">
                  Company Name
                </label>
                <input
                  name="companyName"
                  value={form.companyName}
                  onChange={handleChange}
                  placeholder="Company Name"
                  className="mt-1 block w-full rounded-md border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-3"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-700 dark:text-slate-300">
                  Work Station
                </label>
                <input
                  name="workStation"
                  value={form.workStation}
                  onChange={handleChange}
                  placeholder="Work Station"
                  className="mt-1 block w-full rounded-md border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-3"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-sm text-slate-700 dark:text-slate-300">
                  Job Category
                </label>
                <select
                  name="jobCategory"
                  value={form.jobCategory}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-3"
                >
                  <option value="">Select job category</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Contractual">Contractual</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-700 dark:text-slate-300">
                  Sector
                </label>
                <select
                  name="sector"
                  value={form.sector}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-3"
                >
                  <option value="">Select sector</option>
                  <option value="Information Technology">
                    Information Technology
                  </option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Banking & Finance">Banking & Finance</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Education">Education</option>
                  <option value="Government">Government</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-700 dark:text-slate-300">
                  Work Expericence
                </label>
                <input
                  name="workExperience"
                  value={form.workExperience}
                  onChange={handleChange}
                  placeholder="Work Experience"
                  className="mt-1 block w-full rounded-md border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-3"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-sm text-slate-700 dark:text-slate-300">
                  Education Level
                </label>
                <input
                  name="educationLevel"
                  value={form.educationLevel}
                  onChange={handleChange}
                  placeholder="Education Level"
                  className="mt-1 block w-full rounded-md border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-3"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-700 dark:text-slate-300">
                  Institute
                </label>
                <input
                  name="institute"
                  value={form.institute}
                  onChange={handleChange}
                  placeholder="Institute"
                  className="mt-1 block w-full rounded-md border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-3"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-700 dark:text-slate-300">
                  Passing Year
                </label>
                <input
                  name="passingYear"
                  value={form.passingYear}
                  onChange={handleChange}
                  placeholder="Passing Year"
                  className="mt-1 block w-full rounded-md border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-3"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-sm text-slate-700 dark:text-slate-300">
                  LinkedIn URL
                </label>
                <input
                  name="linkedInUrl"
                  value={form.linkedInUrl}
                  onChange={handleChange}
                  placeholder="LinkedIn URL"
                  className="mt-1 block w-full rounded-md border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-3"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-700 dark:text-slate-300">
                  Facebook URL
                </label>
                <input
                  name="facebookUrl"
                  value={form.facebookUrl}
                  onChange={handleChange}
                  placeholder="Facebook URL"
                  className="mt-1 block w-full rounded-md border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-3"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-700 dark:text-slate-300">
                  Twitter URL (X)
                </label>
                <input
                  name="twitterUrl"
                  value={form.twitterUrl}
                  onChange={handleChange}
                  placeholder="Twitter URL (X)"
                  className="mt-1 block w-full rounded-md border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-3"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div ref={skillsRef} className="relative">
                <label className="block text-sm text-slate-700 dark:text-slate-300">
                  Skills
                </label>
                <button
                  type="button"
                  onClick={() => setSkillsOpen((s) => !s)}
                  className="mt-1 w-full text-left rounded-md border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-3"
                >
                  {form.skills.length > 0
                    ? form.skills.join(", ")
                    : "Select skills"}
                </button>

                {skillsOpen && (
                  <div className="absolute z-20 mt-2 w-full max-h-60 overflow-auto rounded-md border border-gray-200 bg-white dark:bg-slate-900 p-3 shadow-lg">
                    <div className="grid grid-cols-1 gap-2">
                      {predefinedSkills.map((opt) => (
                        <label
                          key={opt}
                          className="inline-flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            name="skills"
                            value={opt}
                            checked={form.skills.includes(opt)}
                            onChange={() => toggleSkill(opt)}
                            className="rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                          />
                          <span className="text-sm text-slate-700 dark:text-slate-300">
                            {opt}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm text-slate-700 dark:text-slate-300">
                  Certifications
                </label>
                <input
                  name="certifications"
                  value={form.certifications}
                  onChange={handleChange}
                  placeholder="Certifications"
                  className="mt-1 block w-full rounded-md border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-3"
                />
              </div>

              <div>
                {/* <label className="block text-sm text-slate-700 dark:text-slate-300">
                  Passing Year
                </label>
                <input
                  name="passingYear"
                  value={form.passingYear}
                  onChange={handleChange}
                  placeholder="Passing Year"
                  className="mt-1 block w-full rounded-md border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-3"
                /> */}
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
