import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminAIChatDrawer from "./AdminAIChatDrawer";

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-muted/30">
      <AdminSidebar />
      <main className="flex-1 min-w-0 overflow-x-hidden">
        <div className="max-w-7xl mx-auto p-6">
          <Outlet />
        </div>
      </main>
      <AdminAIChatDrawer />
    </div>
  );
}
