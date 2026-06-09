import { Navigate, useLocation } from "react-router-dom";
import { useAdminSession } from "../hooks/useAdminSession";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { loading, email, isAdmin } = useAdminSession();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Caricamento...
      </div>
    );
  }

  if (!email) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
