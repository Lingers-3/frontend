import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { AppSidebarTrigger } from "~/components/app/AppSidebar";
import ToggleThemeButton from "~/components/primitives/ToggleThemeButton";
import { ViewModeSwitch } from "~/modules/inventory/pages/ViewModeSwitch";
import type { Route } from "./items/+types";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Inventory | Pocketeer" }];
}

export default function InventoryLayout() {
  const nav = useNavigate();
  const loc = useLocation();

  useEffect(() => {
    if (loc.pathname === "/inventory") nav("item-types", { replace: true });
  }, [loc.pathname, nav]);

  return (
    <div className="bg-dracula-background h-screen flex flex-col"> 
      <div className="p-7 flex flex-col items-center justify-center flex-shrink-0"> 
        <div className="flex w-full justify-between">
          <AppSidebarTrigger />
          <ViewModeSwitch />
          <ToggleThemeButton />
        </div>
      </div>
      
      <div className="flex-1 overflow-auto"> 
        <Outlet />
      </div>
    </div>
  );
}
