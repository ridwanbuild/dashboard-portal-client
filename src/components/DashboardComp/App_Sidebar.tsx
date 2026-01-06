import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

const items = [
  { title: "Home", url: "#", icon: Home },
  { title: "Inbox", url: "#", icon: Inbox },
  { title: "Calendar", url: "#", icon: Calendar },
  { title: "Search", url: "#", icon: Search },
  { title: "Settings", url: "#", icon: Settings },
]




export function App_Sidebar() {
  return (
    <Sidebar className="border ">
      <SidebarContent className="">

        <SidebarGroup className="">

          <SidebarGroupLabel className=" text-xl font-semibold border-b py-7">Darkstone Portal</SidebarGroupLabel>

          <SidebarGroupContent >

            <SidebarMenu className=" pt-5">

              {items.map((item) => (
                <SidebarMenuItem key={item.title}>

                  <SidebarMenuButton asChild>

                    <Link href={item.url} className="py-6 ">
                      <item.icon className="mr  h-8 w-8" />
                      <span className="text-xl">{item.title}</span>
                    </Link>

                  </SidebarMenuButton>

                </SidebarMenuItem>
              ))}

            </SidebarMenu>


          </SidebarGroupContent>
        </SidebarGroup>


      </SidebarContent>
    </Sidebar>
  )
}