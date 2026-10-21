import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import "../../index.css";
import AdminAIChatDrawer from "./AdminAIChatDrawer";

const qc = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={qc}>
      <MemoryRouter initialEntries={["/admin/waitlist"]}>
        <div className="min-h-screen bg-background p-8">
          <p>preview</p>
          <AdminAIChatDrawer />
        </div>
      </MemoryRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
