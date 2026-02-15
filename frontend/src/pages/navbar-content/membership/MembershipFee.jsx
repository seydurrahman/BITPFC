function MembershipFee() {
  return (
    <div className="w-full py-10">
      <div className="max-w-7xl mx-auto px-4 mb-32">
        <h2 className="text-3xl font-bold mb-6">Membership Fee</h2>
        <p className="mb-6 text-slate-700">
          The membership fee for BITPFC is structured to accommodate various
          categories of members.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border rounded-lg p-6 bg-white">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              Lifetime Member
            </h3>
            <p className="text-sm text-slate-500 mb-4">
              Minimum 15 Years Job Experience
            </p>
            <div className="text-3xl font-bold text-slate-900">20,000</div>
            <div className="text-sm text-slate-500">(One Time)</div>
            <div className="mt-4 text-sm">
              Voting Right: <span className="font-medium">Yes</span>
            </div>
          </div>

          <div className="border rounded-lg p-6 bg-white">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              CXO Professional Member
            </h3>
            <p className="text-sm text-slate-500 mb-4">
              Minimum 5 Years Job Experience
            </p>
            <div className="text-3xl font-bold text-slate-900">5,000</div>
            <div className="text-sm text-slate-500">(Yearly)</div>
            <div className="mt-4 text-sm">
              Voting Right: <span className="font-medium">Yes</span>
            </div>
          </div>

          <div className="border rounded-lg p-6 bg-white">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              Professional Member
            </h3>
            <p className="text-sm text-slate-500 mb-4">
              Minimum 2 Years Job Experience
            </p>
            <div className="text-3xl font-bold text-slate-900">1,500</div>
            <div className="text-sm text-slate-500">(Yearly)</div>
            <div className="mt-4 text-sm">
              Voting Right: <span className="font-medium">Yes</span>
            </div>
          </div>

          <div className="border rounded-lg p-6 bg-white">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              Student Member
            </h3>
            <p className="text-sm text-slate-500 mb-4">
              Fresher / Currently Studying
            </p>
            <div className="text-3xl font-bold text-slate-900">500</div>
            <div className="text-sm text-slate-500">(Yearly)</div>
            <div className="mt-4 text-sm">
              Voting Right: <span className="font-medium">No</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MembershipFee;
