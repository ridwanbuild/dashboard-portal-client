"use client"

import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
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

const items = [
  { title: "Home", url: "#", icon: Home },
  { title: "Inbox", url: "#", icon: Inbox },
  { title: "Calendar", url: "#", icon: Calendar },
  { title: "Search", url: "#", icon: Search },
  { title: "Settings", url: "#", icon: Settings },
];

export function App_Sidebar() {


  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar className="border ">
      <SidebarContent className="">
        <SidebarGroup className="">
          <SidebarGroupLabel className=" text-gray-800 flex items-center justify-between rounded-none  border-b py-7">
            <h2 className="font-bold text-xl">Darkstone Portal</h2>

            {/* close icon in the mobile */}
           <button 
              onClick={() => setOpenMobile(false)} 
              className="lg:hidden cursor-pointer text-slate-500 hover:text-slate-800 transition bg-slate-200 rounded-full p-1"
            >
              <IoMdClose size={20} />
            </button>


          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className=" pt-5">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className="py-5 px-2  ">
                      <item.icon className="mr  h-8 w-8" />
                      <span className="text-lg">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
