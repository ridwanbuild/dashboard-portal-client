import { authClient } from '@/app/auth/uth_client'
import { SidebarItem, sidebarRoutes } from '@/app/config/dashboard-routes';


export default function useRole() {

    const {data: session, isPending, error} = authClient.useSession()

    const user = session?.user

    const role = user?.role?.toLowerCase() || "employee";

    const menuItems: SidebarItem[] = sidebarRoutes[role] || sidebarRoutes.employee;


  return {
    user,
    role,
    menuItems,
    isLoading: isPending,
    isAdmin: role === "admin",      
    isManager: role === "manager", 
    isEmployee: role === "employee", 
    error             
  }
}
