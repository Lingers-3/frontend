import { Outlet, redirect, useNavigate } from "react-router";
import { AppSidebar } from "~/components/app/AppSidebar";
import { SidebarProvider } from "~/components/ui/sidebar";
import type { Route } from "./+types/layout";
import { auth } from "~/services/auth";
import { LoaderIcon } from "lucide-react";
import { userQueryKey, userQueryFn } from "~/hooks/use-user";
import { queryClient } from "~/root";
import { useUser } from "~/hooks/use-user";
import { useEffect } from "react";

export async function clientLoader(_: Route.ClientLoaderArgs) {
  try {
    await queryClient.fetchQuery({
      queryKey: userQueryKey,
      queryFn: userQueryFn,
      staleTime: 5 * 60 * 1000,
    });

    return { isAuthenticated: true };
  } catch (_) {
    auth.login();
    return { isAuthenticated: false };
  }
}

function InplaceFallback({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-dracula-background">
      <LoaderIcon
        size={40}
        role="status"
        aria-label="Loading"
        className="animate-spin"
      />
      <div className="mt-4 text-lg">{message}</div>
    </div>
  );
}

export const HydrateFallback = () => <InplaceFallback message="Loading..." />;

clientLoader.hydrate = true as const;

export default function Layout({
  loaderData: { isAuthenticated },
}: Route.ComponentProps) {
  const navigate = useNavigate();
  const { data: user, isLoading } = useUser();

  useEffect(() => {
    if (user && !user.email_verified) {
      navigate(
        "/error?code=403&message=email+not+verified",
        { replace: true }
      );
    }
  }, [user, navigate]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-screen h-screen bg-dracula-background">
        {!isAuthenticated ? (
          <InplaceFallback message="Redirecting to login..." />
        ) : isLoading ? (
          <InplaceFallback message="Profile data loading..." />
        ) : (
          <Outlet />
        )}
      </main>
    </SidebarProvider>
  );
}
