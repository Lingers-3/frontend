import { Link, NavLink } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "~/components/ui/sidebar";
import {
  Drill,
  FolderPen,
  LayoutTemplate,
  Settings,
  Package,
} from "lucide-react";

export function AppSidebar() {
  const { isMobile, toggleSidebar } = useSidebar();

  const menuItems = [
    { name: "Inventory", path: "/inventory", icon: <Drill /> },
    { name: "Projects", path: "/projects", icon: <FolderPen /> },
    { name: "Templates", path: "/templates", icon: <LayoutTemplate /> },
  ];
  const settingsItem = {
    name: "Settings",
    path: "/settings",
    icon: <Settings />,
  };

  return (
    <Sidebar side="left" className="h-screen border-none">
      <SidebarContent className="h-full flex flex-col p-2 justify-between bg-dracula-background/50">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className="flex items-center justify-between mt-4 p-0">
                <Link
                  to="/"
                  className="cursor-pointer flex items-center space-x-4 px-5"
                >
                  <span className="text-3xl font-bold text-dracula-purple">
                    Pocketeer
                  </span>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem className="flex flex-col gap-3 mt-8">
                {menuItems.map((item) => (
                  <NavLink
                    to={item.path}
                    key={item.name}
                    className={({ isActive }) =>
                      `w-full text-lg flex items-center px-6 gap-4 py-4 cursor-pointer rounded-xl 
                      ${
                        isActive
                          ? "bg-dracula-current-line/50 text-accent-foreground font-semibold"
                          : "text-font-primarly hover:bg-dracula-current-line/30 hover:text-accent-foreground"
                      } 
                      transition-colors duration-200`
                    }
                    onClick={() => {
                      if (isMobile) toggleSidebar();
                    }}
                  >
                    {item.icon}
                    {item.name}
                  </NavLink>
                ))}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <NavLink
                  to={settingsItem.path}
                  key={settingsItem.name}
                  className={({ isActive }) =>
                    `w-full text-lg flex items-center px-6 gap-4 py-4 cursor-pointer rounded-xl 
                      ${
                        isActive
                          ? "bg-dracula-current-line/50 text-accent-foreground font-semibold"
                          : "text-font-primarly hover:bg-dracula-current-line/30 hover:text-accent-foreground"
                      } 
                      transition-colors duration-200`
                  }
                  onClick={() => {
                    if (isMobile) toggleSidebar();
                  }}
                >
                  {settingsItem.icon}
                  {settingsItem.name}
                </NavLink>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

import { PanelLeft } from "lucide-react";
import { cn } from "~/lib/utils";
import { Button } from "../ui/button";

interface AppSidebarTriggerProps
  extends React.HTMLAttributes<HTMLButtonElement> {}

export const AppSidebarTrigger = ({
  className,
  ...props
}: AppSidebarTriggerProps) => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      onClick={toggleSidebar}
      variant={"secondary"}
      className={cn(
        "p-5 rounded-xl bg-dracula-current-line/70 hover:bg-dracula-current-line transition-all duration-200",
        className
      )}
      {...props}
    >
      <PanelLeft size={20} />
    </Button>
  );
};
