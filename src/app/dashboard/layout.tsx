// src/app/dashboard/layout.tsx

import { App_Sidebar } from "@/components/DashboardComp/App_Sidebar";
import Dashboard_Navbar from "@/components/DashboardComp/Dashboard_Navbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="">

      <div className="">
        <App_Sidebar />
      </div>

      <main className="flex-1 px-3 ">
        <div className="flex items-center mb-3 justify-between w-full px-6 py-3.5 bg-white border">

          <SidebarTrigger className="" />
          <Dashboard_Navbar></Dashboard_Navbar>

        </div>

        <div className="">{children}</div>
        
      </main>
    </SidebarProvider>
  );
}
