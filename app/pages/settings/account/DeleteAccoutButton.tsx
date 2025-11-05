import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button, buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { auth } from "~/services/auth";

export default function DeleteAccountButton() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className="w-full rounded-xl justify-start gap-3 bg-dracula-red/10 border border-dracula-red/30 hover:bg-dracula-red/20 text-dracula-text-primary h-auto py-3"
        >
          <Trash2 className="h-5 w-5" />
          <div className="text-left">
            <p className="text-sm font-medium">Delete account</p>
            <p className="text-xs opacity-80">
              Permanently delete your account
            </p>
          </div>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-2xl bg-dracula-background border-dracula-selection w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete your account?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and all your data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={auth.delete}
            className={cn(buttonVariants({ variant: "destructive" }))}
          >
            Delete account forever
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
