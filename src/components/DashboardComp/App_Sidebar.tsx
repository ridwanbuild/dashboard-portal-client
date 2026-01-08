"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import { usePathname } from "next/navigation";
import useRole from "@/hooks/useRole";

export function App_Sidebar() {
  const { setOpenMobile } = useSidebar();
  
  const pathname = usePathname();

  const { menuItems, isLoading, role } = useRole();

  if (isLoading) {
    return (
      <div className="p-6 text-sm text-slate-500 animate-pulse">Loading...</div>
    );
  }

  return (
    <Sidebar className="border-r">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-800 flex items-center justify-between rounded-none border-b py-7 px-4">
            <div>
              <h2 className="font-bold text-xl ">Darkstone Portal</h2>

              <span className="text-[13px] text-gray-700 py-1 semibold uppercase  leading-none">
                {role} mode
              </span>

            </div>

            <button
              onClick={() => setOpenMobile(false)}
              className="lg:hidden cursor-pointer text-slate-500 hover:text-slate-800 transition bg-slate-100 rounded-full p-1.5"
            >
              <IoMdClose size={20} />
            </button>
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="pt-6 px-3">
              {menuItems.map((item) => {
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={`py-6 text-lg px-4 capitalize flex items-center gap-3 transition-all rounded-lg group ${
                          isActive
                            ? "bg-blue-50 text-blue-600 font-semibold "
                            : "hover:bg-slate-50 text-slate-700 font-medium"
                        }`}
                        onClick={() => setOpenMobile(false)}
                      >
                        <item.icon
                          className={`h-6 w-6 transition-colors ${
                            isActive
                              ? "text-blue-600"
                              : "text-slate-400 group-hover:text-slate-700"
                          }`}
                        />

                        <span className="text-[16px]">{item.title}</span>
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
