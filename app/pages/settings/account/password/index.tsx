import { KeyRound } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import ChangePasswordForm from "./ChangePasswordForm";

export default function ChangePasswordButton() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full rounded-xl justify-start gap-3 bg-dracula-current-line border-dracula-selection hover:bg-dracula-current-line/60 text-dracula-text-primary h-auto py-3"
        >
          <KeyRound className="h-5 w-5 text-dracula-text-secondary" />
          <div className="text-left">
            <p className="text-sm font-medium">Change password</p>
            <p className="text-xs text-dracula-text-secondary">
              Update your password
            </p>
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-2xl bg-dracula-background border-dracula-selection w-sm">
        <DialogHeader>
          <DialogTitle>Change password</DialogTitle>
        </DialogHeader>

        <ChangePasswordForm open={open} onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
