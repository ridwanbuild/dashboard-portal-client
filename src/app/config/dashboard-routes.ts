import {
  Home,
  Users,
  UserPlus,
  Settings,
  LayoutDashboard,
  ClipboardList,
  Bell,
  ShieldCheck,
  Package,        // For physical assets
  FileSignature,  // For signing/agreements
  Heart,          // For Happiness center
  FileText,       // For documents/reports
  CheckSquare,    // For approvals
  Briefcase,      // For Team/Managerial work
  UserCog         // For Admin/Settings
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
    { title: "Add New", url: "/dashboard/admin/add-new", icon: UserPlus },
    { title: "Assets", url: "/dashboard/admin/company-assets", icon: Package },
    { title: "Agreements", url: "/dashboard/admin/company-agreements", icon: FileText },
    { title: "Happiness center", url: "/dashboard/admin/happiness-center", icon: Heart },
    { title: "User Info", url: "/dashboard/admin/all-user", icon: Settings },
    { title: "Settings", url: "/dashboard/admin/settings", icon: Settings },
  ],

  manager: [
    { title: "Manager Overview", url: "/dashboard/manager", icon: LayoutDashboard },
    { title: "My Team", url: "/dashboard/manager/team", icon: Users },
    { title: "Agreements", url: "/dashboard/manager/manager-agreements", icon: FileText },
    { title: "Assets", url: "/dashboard/manager/manager-assets", icon: Package },
    { title: "Performance Reports", url: "/dashboard/manager/reports", icon: ClipboardList },
    { title: "Leave Approvals", url: "/dashboard/manager/approvals", icon: CheckSquare },
  ],

  employee: [
    { title: "Employee Overview", url: "/dashboard/employee", icon: Home },
    { title: "My Assets", url: "/dashboard/employee/employee-assets", icon: Package },
    { title: "Agreement", url: "/dashboard/employee/employee-agreement", icon: FileSignature },
  
    { title: "Happiness", url: "/dashboard/employee/employee-happiness", icon: Heart },
    { title: "Reports & Pay", url: "/dashboard/employee/reports", icon: FileText },
    { title: "Notifications", url: "/dashboard/employee/notifications", icon: Bell },
  ],
};