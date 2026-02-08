import { Link, Outlet } from "react-router-dom";

export default function MembersAdmin() {
  return (
    <div className="p-4">
      <div className="mb-4 flex gap-2">
        {/* Member Category button removed */}
      </div>

      <div className="bg-white rounded shadow p-4">
        <Outlet />
      </div>
    </div>
  );
}
