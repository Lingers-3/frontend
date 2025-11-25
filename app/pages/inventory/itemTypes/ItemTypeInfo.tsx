import { Link, useNavigate } from "react-router";
import {
  AlertTriangle,
  ArrowLeft,
  Package,
  Tag as TagIcon,
  Edit,
  Trash2,
} from "lucide-react";
import { useDeleteItemType } from "~/hooks/inventory-hooks";
import ItemTypeDialog from "./ItemTypeDialog";
import { toast } from "sonner";
import type { ItemTypeFull } from "~/services/itemType/types";

interface ItemTypeInfoProps {
  type: ItemTypeFull;
}

export function ItemTypeInfo({ type }: ItemTypeInfoProps) {
  const { mutate: deleteItemType } = useDeleteItemType();

  const navigate = useNavigate();

  const totalQuantity = type.items.reduce((acc, i) => acc + i.quantity, 0);
  const hasShortage =
    type.shortage_threshold !== null && totalQuantity < type.shortage_threshold;

  return (
    <aside className="w-full md:w-80 shrink-0 top-6 h-fit pt-2">
      <Link
        to=".."
        relative="path"
        className="inline-flex items-center gap-1 text-lg text-dracula-comment hover:text-dracula-cyan mb-7 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to types
      </Link>

      <div className="bg-dracula-foreground/10 rounded-2xl border border-dracula-selection p-6 space-y-6">
        <div className="w-full aspect-square rounded-xl bg-dracula-background border border-dracula-selection flex items-center justify-center text-dracula-purple overflow-hidden">
          {type.picture_id ? (
            <img
              src={`/api/images/${type.picture_id}`}
              alt={type.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <Package className="w-20 h-20" />
          )}
        </div>

        <div>
          <h1 className="text-2xl font-bold text-dracula-foreground mb-2">
            {type.name}
          </h1>
          <p className="text-sm text-dracula-comment">
            {type.description || "No description provided."}
          </p>
        </div>

        <div className="bg-dracula-background rounded-xl p-4 border border-dracula-selection">
          <div className="text-xs text-dracula-comment mb-1">Total stock</div>
          <div
            className={`text-3xl font-bold flex items-baseline gap-2 ${
              hasShortage ? "text-dracula-red" : "text-dracula-green"
            }`}
          >
            {totalQuantity}
            <span className="text-base font-normal text-dracula-foreground">
              {type.display_measurement_unit}
            </span>
          </div>
          <div className="text-xs text-dracula-comment mt-1">
            Across {type.items.length} items
          </div>
          {hasShortage && (
            <div className="flex items-center gap-1 text-xs text-dracula-red mt-2">
              <AlertTriangle className="w-3 h-3" />
              Below threshold ({type.shortage_threshold})
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-dracula-comment">Measurement unit:</span>
          <span className="text-dracula-foreground font-medium">
            {type.display_measurement_unit}
          </span>
        </div>

        {type.tags.length > 0 && (
          <div>
            <div className="text-xs text-dracula-comment mb-2 flex items-center gap-1">
              <TagIcon className="w-3 h-3" />
              Tags
            </div>
            <div className="flex flex-wrap gap-2">
              {type.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-medium bg-dracula-background border border-dracula-selection"
                  style={{
                    color: `#${tag.color}` || "var(--color-dracula-cyan)",
                    borderColor: tag.color
                      ? `#${tag.color}40`
                      : "var(--color-dracula-selection)",
                    borderWidth: "2px",
                  }}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        )}

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
                navigate("/inventory/types");
              }
            }}
            className="cursor-pointer flex items-center justify-center gap-2 bg-dracula-red/10 hover:bg-dracula-red/20 text-dracula-red font-semibold px-4 py-2.5 rounded-lg transition-colors text-sm border border-dracula-red/30"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
