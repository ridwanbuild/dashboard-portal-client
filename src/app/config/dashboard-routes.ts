import { 
  Home, Users, UserPlus, Settings, LayoutDashboard, 
  ClipboardList, Bell, ShieldCheck, Package, FileSignature, FileText 
} from "lucide-react";

export type SidebarItem = {
  title: string;
  url: string;
  icon: any;
};

export const sidebarRoutes: Record<string, SidebarItem[]> = {
  admin: [
    { title: "Admin Overview", url: "/dashboard/admin", icon: ShieldCheck },
    { title: "All Employees", url: "/dashboard/admin/all-employees", icon: Users },
    { title: "Register Employee", url: "/dashboard/admin/add-new", icon: UserPlus },
    { title: "Company Assets", url: "/dashboard/admin/assets", icon: Package },
    { title: "Settings", url: "/dashboard/admin/settings", icon: Settings },
  ],
  manager: [
    { title: "Team Dashboard", url: "/dashboard/manager", icon: LayoutDashboard },
    { title: "My Team", url: "/dashboard/manager/team", icon: Users },
    { title: "Performance Reports", url: "/dashboard/manager/reports", icon: ClipboardList },
    { title: "Leave Approvals", url: "/dashboard/manager/approvals", icon: Bell },
  ],
  employee: [
    { title: "My Profile", url: "/dashboard/employee", icon: Home },
    { title: "My Assets", url: "/dashboard/employee/my-assets", icon: Package }, 
    { title: "Agreement", url: "/dashboard/employee/agreement", icon: FileSignature }, 
    { title: "Reports & Pay", url: "/dashboard/employee/reports", icon: FileText },
    { title: "Notifications", url: "/dashboard/employee/notifications", icon: Bell },
  ],
};