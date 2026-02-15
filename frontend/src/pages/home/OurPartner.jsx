import img1 from "../../assets/Partners/partner1.png";

const partners = [
  {
    id: 1,
    logo: img1,
    name: "SPINNRT TECH",
    slogan: "Software & Mobile App Development.",
  },
];

export default function OurPartner() {
  return (
    <section className="w-full py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
          Our Partners
        </h2>
        <p className="text-xl text-slate-700 mb-8">
          Working With our partners to bring digital innovation to your business
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 items-stretch">
          {partners.map((p) => (
            <div
              key={p.id}
              className="bg-white border rounded-xl p-6 flex flex-col sm:flex-row items-center gap-5 hover:shadow-md transition"
            >
              {/* Big Logo */}
              <div className="w-48 h-26 flex items-center justify-center flex-shrink-0">
                <img
                  src={p.logo}
                  alt={p.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              {/* Text Section */}
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-medium text-base text-slate-800">
                  {p.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1">{p.slogan}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
