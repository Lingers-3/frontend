import { LogOut } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { auth } from "~/services/auth";

interface LogoutButtonProps {
  variant: "fast" | "settings";
}

export default function LogoutButton({ variant }: LogoutButtonProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {variant === "settings" ? (
          <Button
            variant="outline"
            className="w-full rounded-xl justify-start gap-3 bg-dracula-current-line border-dracula-selection hover:bg-dracula-current-line/60 text-dracula-text-primary h-auto py-3"
          >
            <LogOut className="h-5 w-5 text-dracula-text-secondary" />
            <div className="text-left">
              <p className="text-sm font-medium">Logout</p>
              <p className="text-xs text-dracula-text-secondary">
                Sign out of your account
              </p>
            </div>
          </Button>
        ) : (
          <Button
            variant="outline"
            className="h-12 rounded-xl justify-start gap-2 bg-dracula-current-line border-dracula-selection hover:bg-dracula-current-line/60 text-dracula-text-primary"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        )}
      </AlertDialogTrigger>
      {variant === "fast" && (
        <AlertDialogOverlay className="fixed inset-0 bg-black/10 backdrop-blur-sm" />
      )}
      <AlertDialogContent className="rounded-2xl bg-dracula-background border-dracula-selection w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
          <AlertDialogDescription>
            This will sign you out of your account and redirect you to the login
            page.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={auth.logout}>Logout</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
