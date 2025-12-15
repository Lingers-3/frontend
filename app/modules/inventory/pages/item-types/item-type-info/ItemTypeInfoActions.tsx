import { Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import ItemTypeDialog from "../ItemTypeDialog";
import type { ItemTypeFull } from "~/modules/inventory/services/item-type/types";
import { useDeleteItemType } from "~/modules/inventory/hooks/inventory-hooks";
import { useNavigate } from "react-router";

interface ItemTypeInfoActionsProps {
  type: ItemTypeFull;
}

export function ItemTypeInfoActions({ type }: ItemTypeInfoActionsProps) {
  const { mutate: deleteItemType } = useDeleteItemType();
  const navigate = useNavigate();

  return (
    <div className="flex gap-2 pt-4 border-t border-dracula-selection">
      <ItemTypeDialog
        mode="update"
        itemType={type}
        trigger={
          <button className="cursor-pointer flex-1 flex items-center justify-center gap-2 bg-dracula-purple hover:bg-dracula-purple/90 text-dracula-background font-semibold px-4 py-2.5 rounded-lg transition-colors text-sm">
            <Edit className="w-4 h-4" />
            Edit
          </button>
        }
      />

      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (type.items.length > 0) {
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
            deleteItemType({ id: type.id, force: true });
            toast.info("Item type deleted");
            navigate("/inventory/item-types");
          }
        }}
        className="cursor-pointer flex items-center justify-center gap-2 bg-dracula-red/10 hover:bg-dracula-red/20 text-dracula-red font-semibold px-4 py-2.5 rounded-lg transition-colors text-sm border border-dracula-red/30"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
