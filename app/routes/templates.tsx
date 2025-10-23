import { Link } from "react-router";
import type { Route } from "./+types/templates";
import { AppSidebarTrigger } from "~/components/app/AppSidebar";
import { GradientButton } from "~/components/primitives/GradientButton";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Templates" }];
}

export default function Templates() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex p-7">
        <AppSidebarTrigger />
      </div>

      <div className="flex-1 p-8 flex flex-col justify-center items-center gap-12">
        <h1 className="text-3xl font-bold">Templates page</h1>
        <Link to="/">
          <GradientButton>Go home</GradientButton>
        </Link>
      </div>
    </div>
  );
}
