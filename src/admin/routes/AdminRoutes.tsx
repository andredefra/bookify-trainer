import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdminGuard from "../guards/AdminGuard";
import AdminLayout from "../layout/AdminLayout";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ContentPlan from "../pages/ContentPlan";
import CalendarPage from "../pages/Calendar";
import Branding from "../pages/Branding";
import Settings from "../pages/Settings";
import Outreach from "../pages/Outreach";

// Admin module gets its own QueryClient so its caches stay isolated
// from the rest of the app (also avoids contaminating existing queries).
const adminQueryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 30_000, refetchOnWindowFocus: false } },
});

export default function AdminRoutes() {
  return (
    <QueryClientProvider client={adminQueryClient}>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route
          element={
            <AdminGuard>
              <AdminLayout />
            </AdminGuard>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="content-plan" element={<ContentPlan />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="outreach" element={<Outreach />} />
          <Route path="branding" element={<Branding />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}
