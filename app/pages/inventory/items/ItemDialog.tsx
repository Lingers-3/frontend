import { Package, Edit, Plus } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog";
import ItemForm from "./ItemForm";
import type { ItemFull } from "~/services/item/types";

type ItemDialogProps =
  | {
      mode: "create";
      item?: never;
      trigger: React.ReactNode;
      defaultItemTypeId?: number;
    }
  | {
      mode: "update";
      item: ItemFull;
      trigger: React.ReactNode;
      defaultItemTypeId?: never;
    };

export default function ItemDialog({
  mode,
  item: itemData,
  trigger,
  defaultItemTypeId,
}: ItemDialogProps) {
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
                <Plus className="h-6 w-6 text-dracula-green" />
              ) : (
                <Edit className="h-6 w-6 text-dracula-cyan" />
              )}
            </div>
            <div>
              <DialogTitle className="text-dracula-foreground text-xl">
                {mode === "create" ? "Add item" : "Edit item"}
              </DialogTitle>
              <DialogDescription className="text-dracula-comment">
                {mode === "create"
                  ? "Add a new item to your inventory."
                  : "Update the details of this item."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <ItemForm
          mode={mode}
          itemId={itemData?.id}
          initialData={mode === "update" ? itemData : undefined}
          defaultItemTypeId={defaultItemTypeId}
          onClose={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}