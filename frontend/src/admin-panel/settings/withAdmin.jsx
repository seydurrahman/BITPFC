import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

export default function withAdmin(WrappedComponent) {
  return function WithAdminWrapper(props) {
    const [status, setStatus] = useState({ loading: true, allowed: false });
    const navigate = useNavigate();

    useEffect(() => {
      let mounted = true;
      (async () => {
        try {
          const res = await axios.get("user/");
          const data = res.data || {};
          const allowed = !!(
            data.is_admin ||
            data.is_staff ||
            data.is_superuser ||
            data.role === "admin"
          );
          if (mounted) setStatus({ loading: false, allowed });
        } catch (err) {
          if (mounted) setStatus({ loading: false, allowed: false });
        }
      })();
      return () => {
        mounted = false;
      };
    }, []);

    useEffect(() => {
      if (!status.loading && !status.allowed) {
        navigate("/login");
      }
    }, [status, navigate]);

    if (status.loading) return <div>Loading...</div>;

    if (!status.allowed) return null; // redirecting

    return <WrappedComponent {...props} />;
  };
}
