function AdvisorTeam() {
  return (
    <section className="max-w-7xl mx-auto py-12 pb-60 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">Our Advisors</h2>
        <p>Meet the minds behind our mission</p>
      </div>
      {/* Advisors grid - four images */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 gap-y-8 items-start">
          <div className="rounded-lg overflow-hidden bg-white shadow">
            <img
              src="/src/assets/advisor_image/ad-1.png"
              alt="Advisor 1"
              className="w-full h-80"
            />
          </div>

          <div className="rounded-lg overflow-hidden bg-white shadow">
            <img
              src="/src/assets/advisor_image/ad-2.png"
              alt="Advisor 2"
              className="w-full h-80"
            />
          </div>

          <div className="rounded-lg overflow-hidden bg-white shadow">
            <img
              src="/src/assets/advisor_image/ad-3.png"
              alt="Advisor 3"
              className="w-full h-80"
            />
          </div>

          <div className="rounded-lg overflow-hidden bg-white shadow">
            <img
              src="/src/assets/advisor_image/ad-4.png"
              alt="Advisor 4"
              className="w-full h-80"
            />
          </div>
          <div className="rounded-lg overflow-hidden bg-white shadow">
            <img
              src="/src/assets/advisor_image/ad-5.png"
              alt="Advisor 5"
              className="w-full h-80"
            />
          </div>
          <div className="rounded-lg overflow-hidden bg-white shadow">
            <img
              src="/src/assets/advisor_image/ad-6.png"
              alt="Advisor 6"
              className="w-full h-80"
            />
          </div>
          <div className="rounded-lg overflow-hidden bg-white shadow">
            <img
              src="/src/assets/advisor_image/ad-7.png"
              alt="Advisor 7"
              className="w-full h-80"
            />
          </div>
          
        </div>
      </div>
    </section>
  );
}

export default AdvisorTeam;
