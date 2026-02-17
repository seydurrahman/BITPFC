import React from "react";

const StatCard = ({ value, label, icon }) => (
  <div className="bg-white rounded-lg shadow p-6 flex items-center justify-between">
    <div>
      <div className="text-3xl font-semibold text-slate-800">{value}</div>
      <div className="text-sm text-slate-500 mt-1">{label}</div>
    </div>
    <div className="text-slate-400 text-4xl">{icon}</div>
  </div>
);

const Dashboard = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">
        Welcome to Admin Dashboard
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          value={14}
          label="Executive Members"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M16 11c1.657 0 3-1.343 3-3S17.657 5 16 5s-3 1.343-3 3 1.343 3 3 3zM8 11c1.657 0 3-1.343 3-3S9.657 5 8 5 5 6.343 5 8s1.343 3 3 3z"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 20c0-2.21 3.582-4 8-4s8 1.79 8 4"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />

        <StatCard
          value={28}
          label="Registered Members"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M17 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="12"
                cy="7"
                r="4"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />

        <StatCard
          value={
            <>
              <span className="text-2xl">402000</span>{" "}
              <span className="text-sm text-slate-400">BDT</span>
            </>
          }
          label="Membership Payment"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M12 1v22"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17 5H9a4 4 0 100 8h6a4 4 0 110 8H7"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />
      </div>

      <div className="mt-8 bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Overview</h3>
        <p className="text-sm text-slate-600">
          Quick stats and recent activity will appear here. Expand with charts
          or tables as needed.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
