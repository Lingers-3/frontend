import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
} from "~/components/ui/dialog";
import AddManualReservationForm from "./AddManualReservationForm";

interface AddManualReservationDialogProps {
  projectId: number;
  specId: number;
  itemId: number;
  itemName: string;
  maxAvailable: number;
  trigger: React.ReactNode;
}

export default function AddManualReservationDialog(
  props: AddManualReservationDialogProps
) {
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
            Reserve "{props.itemName}"
          </DialogTitle>
        </DialogHeader>

        <AddManualReservationForm {...props} onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
