import { Home, Utensils, Plus } from "lucide-react";
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
} from "../ui/sidebar";
import { useEffect } from "react";
import { useLocation } from "@remix-run/react";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Restaurants",
    url: "/restaurants",
    icon: Utensils,
  },
  {
    title: "Add Restaurant",
    url: "/restaurantsFormCreate",
    icon: Plus,
  },
];

export function AppSidebar() {
  const { open, setOpen, openMobile, setOpenMobile } = useSidebar();
  const location = useLocation();

  useEffect(() => {
    if (open) {
      setOpen(false);
    }
  }, [location, setOpenMobile, openMobile]);

  return (
    <Sidebar
      collapsible="icon"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>NYC Restaurant Explorer</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
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
