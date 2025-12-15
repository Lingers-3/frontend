import { MoreVertical, Edit, Scale, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import ItemTypeDialog from "./ItemTypeDialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import type { ItemTypeFull } from "~/modules/inventory/services/item-type/types";
import { useDeleteItemType } from "~/modules/inventory/hooks/inventory-hooks";

interface ItemTypeCardOptionsProps {
  itemType: ItemTypeFull;
}

export function ItemTypeCardOptions({ itemType }: ItemTypeCardOptionsProps) {
  const { mutate: deleteItemType } = useDeleteItemType();

  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setOpen((prev) => !prev);
          }}
          className="p-2 hover:bg-dracula-current-line rounded-md"
          aria-label="More options"
        >
          <MoreVertical className="w-4 h-4" />
        </button>
      </PopoverTrigger>

      <PopoverContent
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        align="end"
        className="w-48 p-1 bg-dracula-background border border-dracula-selection rounded-lg shadow-lg"
      >
        <ItemTypeDialog
          mode="update"
          itemType={itemType}
          trigger={
            <button className="w-full text-left px-4 py-2 text-sm text-dracula-foreground hover:bg-dracula-current-line flex items-center gap-2 rounded-md">
              <Edit className="w-4 h-4 text-dracula-cyan" /> Edit
            </button>
          }
        />

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="w-full text-left px-4 py-2 text-sm text-dracula-foreground hover:bg-dracula-current-line flex items-center gap-2 rounded-md"
        >
          <Scale className="w-4 h-4 text-dracula-orange" /> UoM
        </button>

        <div className="h-px bg-dracula-selection my-1"></div>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (itemType.items.length > 0) {
              toast.error("Cannot delete item type", {
                description:
                  "Item type has items in stock. Remove all items before deleting.",
              });
              return;
            }
            if (
              confirm(
                "Are you sure you want to delete this item type? This action cannot be undone."
              )
            ) {
              deleteItemType({ id: itemType.id, force: true });
              toast.info("Item type deleted");
            }
          }}
          className="w-full text-left px-4 py-2 text-sm text-dracula-red hover:bg-dracula-current-line flex items-center gap-2 rounded-md"
        >
          <Trash2 className="w-4 h-4" /> Delete
        </button>
      </PopoverContent>
    </Popover>
  );
}
