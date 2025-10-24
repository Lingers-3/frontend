import { Moon, SearchIcon, Sun } from "lucide-react";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "../ui/empty";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "../ui/input-group";
import { Kbd } from "../ui/kbd";
import { AppSidebarTrigger } from "./AppSidebar";
import ToggleThemeButton from "../primitives/ToggleThemeButton";

export default function AppEmpty() {
  return (
    <div className="flex flex-col h-screen bg-dracula-background">
      <div className="p-7 flex w-full justify-between">
        <AppSidebarTrigger />
        <ToggleThemeButton />
      </div>
      <Empty className="flex-1">
        <EmptyHeader>
          <EmptyTitle>Page is under development.</EmptyTitle>
          <EmptyDescription>
            The page you&apos;re looking for is currently under development. Try
            searching for what you need below.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <InputGroup className="sm:w-3/4">
            <InputGroupInput placeholder="Try searching for pages..." />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
              <Kbd className="bg-dracula-background">/</Kbd>
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
