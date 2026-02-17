import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [chars, setChars] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    if (name === "message") setChars(value.length);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted", form);
    alert("Message sent (demo)");
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    setChars(0);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow rounded p-6">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4">
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-6 text-sm">
              <div className="flex items-start gap-3">
                <div className="text-blue-600 mt-1">📍</div>
                <div>
                  <div className="font-semibold">Company Location</div>
                  <div className="text-gray-600">457/1 Mirpur, Dhaka</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-blue-600 mt-1">✉️</div>
                <div>
                  <div className="font-semibold">Email us</div>
                  <div className="text-gray-600">info@bitpfc.org</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-blue-600 mt-1">📞</div>
                <div>
                  <div className="font-semibold">Phone</div>
                  <div className="text-gray-600">01705185048</div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-8">
            <h3 className="text-lg font-semibold mb-4">Let's Talk</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="M10 10a4 4 0 100-8 4 4 0 000 8z"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 18a8 8 0 0116 0"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="border rounded px-3 py-2 pl-10 w-full"
                  />
                </div>

                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M21 8v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="border rounded px-3 py-2 pl-10 w-full"
                  />
                </div>

                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="M22 16.92V19a2 2 0 01-2 2c-9.94 0-18-8.06-18-18A2 2 0 017 1h2.09a2 2 0 012 1.72c.12 1.21.5 2.39 1.12 3.46a2 2 0 01-.45 2.11L10.7 9.7a12.04 12.04 0 005.6 5.6l1.4-1.4a2 2 0 012.11-.45c1.07.62 2.25 1 3.46 1.12A2 2 0 0122 16.92z"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="border rounded px-3 py-2 pl-10 w-full"
                  />
                </div>

                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="M12 20h9"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4L16.5 3.5z"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    className="border rounded px-3 py-2 pl-10 w-full"
                  />
                </div>
              </div>

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write message.."
                maxLength={1000}
                className="border rounded px-3 py-2 w-full h-40 resize-none"
              />

              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500">
                  Max: 1000 characters • {chars}
                </div>
                <button
                  type="submit"
                  className="bg-blue-700 text-white px-4 py-2 rounded inline-flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="mt-6 shadow rounded overflow-hidden">
        <iframe
          title="location-map"
          src="https://maps.google.com/maps?q=Mirpur%20Dhaka&t=&z=14&ie=UTF8&iwloc=&output=embed"
          className="w-full h-80 border-0"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default Contact;
