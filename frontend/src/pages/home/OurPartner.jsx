import img1 from "../../assets/1.png";
import img2 from "../../assets/2.png";
import img3 from "../../assets/3.png";
import img4 from "../../assets/4.png";

const partners = [
  {
    id: 1,
    logo: img1,
    name: "TechOne Ltd.",
    slogan: "Innovating IT Solutions",
  },
  { id: 2, logo: img2, name: "DevStudio", slogan: "Build. Ship. Scale." },
  { id: 3, logo: img3, name: "CloudWorks", slogan: "Cloud-first strategies" },
  { id: 4, logo: img4, name: "DataSense", slogan: "Insights that matter" },
];

export default function OurPartner() {
  return (
    <section className="w-full py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
          Our Partners
        </h2>
        <p className="text-2xl text-slate-700 mb-8">
          Working With our partners to bring digital innovation to your business
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 items-stretch">
          {partners.map((p) => (
            <div
              key={p.id}
              className="bg-white border rounded-lg p-4 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left hover:shadow-lg transition"
            >
              <div className="w-20 h-20 mr-4 flex-shrink-0 flex items-center justify-center">
                <img
                  src={p.logo}
                  alt={p.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              <div className="flex-1">
                <div className="font-semibold text-lg text-slate-800">
                  {p.name}
                </div>
                <div className="text-sm text-slate-500 mt-1">{p.slogan}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
