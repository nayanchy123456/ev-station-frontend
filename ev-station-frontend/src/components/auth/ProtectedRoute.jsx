import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  // 🚫 If not logged in → send to login
  if (!token || !user) return <Navigate to="/login" replace />;

  const { role } = user;

  // ✅ If role not allowed → redirect to their own dashboard
  if (!allowedRoles.includes(role)) {
    if (role === "ADMIN") return <Navigate to="/admin-dashboard" replace />;
    if (role === "HOST") return <Navigate to="/host-dashboard" replace />;
    return <Navigate to="/user-dashboard" replace />;
  }

  // ✅ Role allowed → show protected content
  return children;
};

export default ProtectedRoute;
