import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
} from "~/components/ui/dialog";
import UpdateUsageForm from "./UpdateUsageForm";

interface UpdateUsageDialogProps {
  projectId: number;
  reservationId: number;
  currentUsed: number;
  maxReserved: number;
  trigger: React.ReactNode;
}

export default function UpdateUsageDialog(props: UpdateUsageDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{props.trigger}</DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="rounded-2xl bg-dracula-background border-dracula-selection max-w-sm"
      >
        <DialogHeader>
          <DialogTitle className="text-dracula-foreground text-lg">
            Update actual usage
          </DialogTitle>
        </DialogHeader>

        <UpdateUsageForm {...props} onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
