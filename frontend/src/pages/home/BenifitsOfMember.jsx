import { CheckCircle } from "lucide-react";

const benefits = [
  "Networking with IT Professionals nationwide",
  "Discounted Rates for Event Participation",
  "Voting Rights",
  "Income Tax Return Service",
  "Career Guideline",
  "Exclusive Discount on DocTime’s healthcare services.",
  "Training Affiliation Discounts",
  "Babuland Free Ticket",
  "Special Offers from IDLC Asset Management",
  "Access the membership directory via the Mobile App",
];

export default function Benefits() {
  return (
    <section className="relative w-full bg-white shadow-md rounded-lg overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 items-center gap-2 py-16 px-6">
        {/* LEFT SIDE — Benefits List */}
        <div>
          <h2 className="text-4xl font-bold text-blue-900 mb-8 relative inline-block">
            Benefits Of Members
            <span className="absolute left-0 -bottom-2 w-24 h-1 bg-green-500 rounded"></span>
          </h2>

          <ul className="space-y-1 mt-1">
            {benefits.map((item, index) => (
              <li key={index} className="flex items-start gap-1 text-md">
                <CheckCircle
                  size={18}
                  className="text-blue-700 mt-1 shrink-0"
                />
                <span className="text-slate-800">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CENTER — Text */}
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-extrabold tracking-wide">
            <span className="text-blue-800">BECOME A</span>
            <br />
            <span className="text-slate-800">MEMBER</span>
          </h3>
        </div>

        {/* RIGHT — Angled CTA */}
        <div className="relative flex items-center justify-center lg:justify-end min-h-[220px]">
          {/* angled background (taller, centered) */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-72 h-56 bg-blue-900 clip-path-triangle rounded-l-[80px]"></div>

          {/* button (vertically centered by parent) */}
          <a
            href="/register"
            className="relative z-10 bg-white text-blue-900 font-semibold px-8 py-3 rounded-full shadow-lg hover:scale-105 hover:bg-indigo-300 transition"
          >
            Apply Now
          </a>
        </div>
      </div>
    </section>
  );
}
