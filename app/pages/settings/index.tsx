import { AppSidebarTrigger } from "~/components/app/AppSidebar";

import { useQuery } from "@tanstack/react-query";
import { Button } from "~/components/ui/button";
import { auth, type User } from "~/services/auth";
import ToggleThemeButton from "~/components/primitives/ToggleThemeButton";

import { LoaderIcon } from "lucide-react";
import SettingsOption from "./SettingsOption";
import LogoutButton from "./LogoutButton";
import AvatarSection from "./AvatarSection";
import { settingsOptions } from "./options";

export default function SettingsPage() {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery<User>({
    queryKey: ["user"],
    queryFn: async () => {
      const result = await auth.me();
      if (result.ok) {
        return result.value;
      }
      throw new Error(result.error.message);
    },
  });

  return (
    <div className="flex flex-col w-full items-center h-screen bg-dracula-background">
      <div className="p-7 flex w-full justify-between">
        <AppSidebarTrigger />
        <ToggleThemeButton />
      </div>

      {isLoading && (
        <div className="flex justify-center items-center h-screen bg-dracula-background">
          <LoaderIcon
            size={40}
            role="status"
            aria-label="Loading"
            className="size-4 animate-spin"
          />
        </div>
      )}
      {error && (
        <div className="flex justify-center items-center h-screen flex-col gap-4 bg-dracula-background">
          <p className="text-dracula-red">Authentication failed</p>
          <Button onClick={() => auth.login()}>Try again</Button>
        </div>
      )}
      {!isLoading && !error && user && (
        <div className="sm:w-sm md:w-md lg:w-lg xl:w-xl">
          <AvatarSection user={user} />

          <div className="mb-8">
            <div className="">
              {settingsOptions.map((option, index) => (
                <SettingsOption
                  key={option.label}
                  index={index}
                  length={settingsOptions.length}
                  Icon={option.icon}
                  description={option.description}
                  label={option.label}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 mt-12">
            <LogoutButton />
          </div>

          <footer
            className="py-8 mt-8 px-4 bg-dracula-background"
            style={{
              borderTop: "1px solid",
              borderImage:
                "linear-gradient(to right, var(--color-dracula-background), var(--color-dracula-current-line), var(--color-dracula-background)) 1",
            }}
          >
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col gap-8 mb-8">
                <div className="flex flex-col items-center">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-3xl">📦</span>
                    <span className="text-xl font-bold text-dracula-purple">
                      Pocketeer
                    </span>
                  </div>
                  <p className="text-dracula-text-secondary text-center">
                    &copy; 2025 Pocketeer. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}
