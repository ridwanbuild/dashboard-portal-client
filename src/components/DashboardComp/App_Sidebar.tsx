"use client"

import { 
  Home, 
  Users, 
  UserPlus, 
  Briefcase, 
  FileText, 
  Bell, 
  Settings, 
  LayoutDashboard, 
  ClipboardList,
  ShieldCheck,
  Package,
  FileSignature // নতুন আইকন ইমপোর্ট করা হয়েছে
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import { usePathname } from "next/navigation";


const adminRoutes = [
  { title: "Admin Overview", url: "/dashboard/admin", icon: ShieldCheck },
  { title: "All Employees", url: "/dashboard/admin/all-employees", icon: Users },
  { title: "Register Employee", url: "/dashboard/admin/add-new", icon: UserPlus },
  { title: "Company Assets", url: "/dashboard/admin/assets", icon: Package },
  { title: "Settings", url: "/dashboard/admin/settings", icon: Settings },
];

const managerRoutes = [
  { title: "Team Dashboard", url: "/dashboard/manager", icon: LayoutDashboard },
  { title: "My Team", url: "/dashboard/manager/team", icon: Users },
  { title: "Performance Reports", url: "/dashboard/manager/reports", icon: ClipboardList },
  { title: "Leave Approvals", url: "/dashboard/manager/approvals", icon: Bell },
];

const employeeRoutes = [
  { title: "My Profile", url: "/dashboard/employee", icon: Home },
  { title: "My Assets", url: "/dashboard/employee/my-assets", icon: Package }, 
  { title: "agreement", url: "/dashboard/employee/agreement", icon: FileSignature }, 
  { title: "Reports & Pay", url: "/dashboard/employee/reports", icon: FileText },
  { title: "Notifications", url: "/dashboard/employee/notifications", icon: Bell },
];



export function App_Sidebar(
  
  { userRole = "employee" }: { userRole?: "admin" | "manager" | "employee" }) {
  const { setOpenMobile } = useSidebar();
  const pathname = usePathname();

  let menuItems = employeeRoutes;
  if (userRole === "admin") menuItems = adminRoutes;
  if (userRole === "manager") menuItems = managerRoutes;


  return (
    <Sidebar className="border">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-800 flex items-center justify-between rounded-none border-b py-7">
            <h2 className="font-bold text-xl">Darkstone Portal</h2>

            <button 
              onClick={() => setOpenMobile(false)} 
              className="lg:hidden cursor-pointer text-slate-500 hover:text-slate-800 transition bg-slate-200 rounded-full p-1"
            >
              <IoMdClose size={20} />
            </button>
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="pt-5 px-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link 
                        href={item.url} 
                        className={`py-6 text-lg px-3 capitalize flex items-center gap-3 transition-all rounded-md group ${
                          isActive 
                            ? "bg-slate-200 text-blue-600 font-semibold " 
                            : "hover:bg-slate-50 text-slate-800 font-medium"
                        }`}
                        onClick={() => setOpenMobile(false)}
                      >
                        <item.icon className={`h-7 w-7 transition-colors ${
                          isActive ? "text-blue-600" : "text-slate-500 group-hover:text-slate-800"
                        }`} />
                        <span className="text-md">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}