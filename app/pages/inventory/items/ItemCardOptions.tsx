import { useState } from "react";
import { Edit, MoreVertical, Trash2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { useDeleteItem } from "~/hooks/inventory-hooks";
import ItemDialog from "./ItemDialog";
import type { ItemFull } from "~/services/item/types";
import { toast } from "sonner";

export function ItemCardOptions({ item }: { item: ItemFull }) {
  const { mutate: deleteItem } = useDeleteItem();

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
        <ItemDialog
          mode="update"
          item={item}
          trigger={
            <button className="w-full text-left px-4 py-2 text-sm text-dracula-foreground hover:bg-dracula-current-line flex items-center gap-2 rounded-md">
              <Edit className="w-4 h-4 text-dracula-cyan" /> Edit
            </button>
          }
        />

        <div className="h-px bg-dracula-selection my-1"></div>

        <button
          onClick={() => {
            if (
              confirm(
                "Are you sure you want to delete this item? This action cannot be undone."
              )
            ) {
              deleteItem({ id: item.id, force: true });
              toast.info("Item deleted");
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
