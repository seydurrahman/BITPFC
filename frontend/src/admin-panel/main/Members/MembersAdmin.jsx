import { Link, Outlet } from "react-router-dom";

export default function MembersAdmin() {
  return (
    <div className="p-4">
      <div className="mb-4 flex gap-2">
        <Link
          to="category"
          className="px-3 py-2 bg-blue-600 text-white rounded"
        >
          Member Category
        </Link>
      </div>

      <div className="bg-white rounded shadow p-4">
        <Outlet />
      </div>
    </div>
  );
}
