import { Outlet } from "react-router";
import { AppSidebarTrigger } from "~/components/app/AppSidebar";
import ToggleThemeButton from "~/components/app/ToggleThemeButton";

export default function ProjectsLayout() {
  return (
    <div className="flex flex-col h-screen bg-dracula-background">
      <div className="p-7 flex w-full justify-between">
        <AppSidebarTrigger />
        <ToggleThemeButton />
      </div>
      <div className="p-7 pt-0 h-full">
        <Outlet />
      </div>
    </div>
  );
}
