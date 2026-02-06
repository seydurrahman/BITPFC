import { Target, Eye } from "lucide-react";

export default function MissionVision() {
  return (
    <section className="w-full py-16 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-14 text-slate-800 dark:text-white">
          Mission & Vision
        </h1>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Mission */}
          <div className="bg-white dark:bg-slate-800 p-10 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
            <div className="flex items-center gap-4 mb-5">
              <Target className="text-blue-600" size={36} />
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">
                Mission
              </h2>
            </div>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              To empower IT professionals through knowledge sharing, networking,
              and continuous learning. We aim to build a collaborative community
              that drives innovation, supports professional growth, and fosters
              ethical and inclusive technological advancement.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white dark:bg-slate-800 p-10 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
            <div className="flex items-center gap-4 mb-5">
              <Eye className="text-purple-600" size={36} />
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">
                Vision
              </h2>
            </div>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              To become a leading platform where IT professionals connect, grow,
              and lead the future of technology through collaboration,
              innovation, and integrity. Our main goal is to advance hardware,
              software, cyber security, technology students, or Bangladeshi IT
              professionals.
            </p>
          </div>
        </div>
        <div className="bg-blue-900 mt-4 rounded-lg p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center text-center text-white">
            {/* Left */}
            <div className="flex items-center justify-center text-start">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold leading-relaxed max-w-lg">
                Providing high-quality professional development and networking
                opportunities.
              </h1>
            </div>

            {/* Right */}
            <div className="flex  text-start items-center justify-center">
              <p className="text-xl md:text-2xl lg:text-3xl font-semibold leading-relaxed max-w-lg">
                Our goal <br />
                <span className="text-lg">
                  is to advance hardware, software, cybersecurity, technology
                  students, and Bangladeshi IT professionals.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
