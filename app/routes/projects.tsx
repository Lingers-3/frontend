import { Link } from "react-router";
import type { Route } from "./+types/projects";
import { AppSidebarTrigger } from "~/components/app/AppSidebar";
import { GradientButton } from "~/components/primitives/GradientButton";
import { FolderCode, Icon, SearchIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "~/components/ui/empty";
import { InputGroup, InputGroupAddon, InputGroupInput } from "~/components/ui/input-group";
import { Kbd } from "~/components/ui/kbd";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Projects" }];
}

export default function Projects() {
  return (
    // <div className="flex flex-col h-screen">
    //   <div className="flex p-7">
    //     <AppSidebarTrigger />
    //   </div>

    //   <div className="flex-1 p-8 flex flex-col justify-center items-center gap-12">
    //     <h1 className="text-3xl font-bold">Projects page</h1>
    //     <Link to="/">
    //       <GradientButton>Go home</GradientButton>
    //     </Link>
    //   </div>
    // </div>
    <div className="flex flex-col bg-black h-screen">
      <div className="p-7">
        <AppSidebarTrigger />
      </div>
      <Empty className="flex-1">
        <EmptyHeader>
        <EmptyTitle>404 - Not Found</EmptyTitle>
        <EmptyDescription>
          The page you&apos;re looking for doesn&apos;t exist. Try searching for
          what you need below.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <InputGroup className="sm:w-3/4">
          <InputGroupInput placeholder="Try searching for pages..." />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <Kbd>/</Kbd>
          </InputGroupAddon>
        </InputGroup>
        <EmptyDescription>
          Need help? <a href="">Contact support</a>
        </EmptyDescription>
      </EmptyContent>
      </Empty>
    </div>
  );
}
