import { Outlet } from "react-router";
import { AppSidebar } from "~/components/app/AppSidebar";
import { SidebarProvider } from "~/components/ui/sidebar";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-screen h-screen bg-dracula-background">
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
