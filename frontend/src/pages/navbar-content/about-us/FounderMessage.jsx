import founderImg from "../../../assets/founder-msg/founder-msg.png";

function FounderMessage() {
  return (
    <section className="max-w-6xl mx-auto py-8 px-8">
      <h1 className="text-3xl font-bold text-center mb-2">
        Founder & President’s Message
      </h1>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Left: image, name, position */}
          <div className="md:col-span-1 flex flex-col items-center text-center">
            <div className="w-72 h-88 md:h-88 bg-slate-100 dark:bg-slate-700 overflow-hidden mb-4 rounded-md">
              <img
                src={founderImg}
                alt="Founder"
                width={288}
                height={280}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top block"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
            <h2 className="text-xl font-semibold">Saleh Mobin</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Founder & President, BITPFC
            </p>
          </div>

          {/* Right: message content */}
          <div className="md:col-span-2 text-start">
            <p className="text-lg text-gray-700 dark:text-slate-200 leading-relaxed mb-4">
              <span className="font-bold text-4xl md:text-5xl align-top leading-none mr-3 inline-block">
                It
              </span>{" "}
              is a privilege to serve as the President of Bangladesh IT
              Professional Friends Club (BITPFC) — a dynamic community that
              represents the strength, creativity, and passion of Bangladesh’s
              IT professionals. At BITPFC, we bring together 15,000+ skilled
              professionals to learn, share, and grow.
            </p>

            <p className="text-lg text-gray-700 dark:text-slate-200 leading-relaxed mb-4">
              <span className="font-bold text-4xl md:text-5xl align-top leading-none mr-3 inline-block">
                Our
              </span>{" "}
              mission is simple — to empower, connect, and inspire. Through
              knowledge-sharing sessions, workshops, and collaborative programs,
              we aim to create opportunities that drive both individual and
              national growth. Our vision is to position Bangladesh as a leading
              force in the global technology arena, where innovation, talent,
              and teamwork shape the digital future. I invite you to be part of
              this journey toward a smarter and stronger Bangladesh.
            </p>

            <p className="underline text-sm">Visit us at 🌐 www.bitpfc.org</p>
            <h3 className="text-xl font-bold text-gray-700 dark:text-slate-200 leading-relaxed text-end">
              — Saleh Mobin
            </h3>
            <p className="text-lg text-gray-700 dark:text-slate-200 leading-relaxed text-end">
              Founder & President
            </p>
            <p className="text-lg text-gray-700 dark:text-slate-200 leading-relaxed text-end">
              Bangladesh IT Professional Friends Club (BITPFC)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FounderMessage;
