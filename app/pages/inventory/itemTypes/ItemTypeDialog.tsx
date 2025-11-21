import { Package, Edit } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog";
import ItemTypeForm from "./ItemTypeForm";
import type { ItemTypeFull } from "~/services/itemType/types";

type ItemTypeDialogProps =
  | { mode: "create"; itemType?: never; trigger: React.ReactNode }
  | { mode: "update"; itemType: ItemTypeFull; trigger: React.ReactNode };

export default function ItemTypeDialog({
  mode,
  itemType: itemTypeData,
  trigger,
}: ItemTypeDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="rounded-2xl bg-dracula-background border-dracula-selection max-w-lg"
      >
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-dracula-current-line rounded-full">
              {mode === "create" ? (
                <Package className="h-6 w-6 text-dracula-purple" />
              ) : (
                <Edit className="h-6 w-6 text-dracula-cyan" />
              )}
            </div>
            <div>
              <DialogTitle className="text-dracula-foreground text-xl">
                {mode === "create" ? "Create Item Type" : "Edit Item Type"}
              </DialogTitle>
              <DialogDescription className="text-dracula-comment">
                {mode === "create"
                  ? "Define a new category for your inventory items."
                  : "Update the details of this item type."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <ItemTypeForm
          mode={mode}
          itemTypeId={itemTypeData?.id}
          initialData={mode === "update" ? itemTypeData : undefined}
          onClose={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
