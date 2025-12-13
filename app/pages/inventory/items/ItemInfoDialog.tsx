import { useMemo } from "react";
import {
  Package,
  CalendarClock,
  DollarSign,
  Tag as TagIcon,
  Edit,
  Trash2,
  AlertTriangle,
  Scale,
  X,
  Plus,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog";
import type { ItemFull } from "~/services/item/types";
import ItemDialog from "./ItemDialog";
import { useDeleteItem, useUpdateItem } from "~/hooks/inventory-hooks";
import TagDialog from "../tags/TagDialog";

interface ItemInfoDialogProps {
  item: ItemFull;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ItemInfoDialog = ({
  item,
  open,
  onOpenChange,
}: ItemInfoDialogProps) => {
  const { mutate: deleteItem, isPending } = useDeleteItem();
  const { mutate: update } = useUpdateItem();

  const isExpiringSoon = useMemo(() => {
    if (!item.expiration_date) return false;
    const now = new Date();
    const exp = new Date(item.expiration_date);
    const diffTime = exp.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays >= 0;
  }, [item.expiration_date]);

  const isExpired = useMemo(() => {
    if (!item.expiration_date) return false;
    const now = new Date();
    const exp = new Date(item.expiration_date);
    return exp < now;
  }, [item.expiration_date]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="rounded-2xl bg-dracula-background border-dracula-selection max-w-md"
      >
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-dracula-current-line rounded-full">
              <Package className="h-6 w-6 text-dracula-cyan" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-dracula-foreground text-xl">
                Item details
              </DialogTitle>
              <DialogDescription className="text-dracula-comment">
                View and manage this item's information
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {(isExpiringSoon || isExpired) && (
            <div
              className={`flex items-center gap-2 p-3 rounded-lg border-2 ${
                isExpired
                  ? "bg-dracula-red/10 border-dracula-red text-dracula-red"
                  : "bg-dracula-orange/10 border-dracula-orange text-dracula-orange"
              }`}
            >
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <div className="text-sm font-semibold">
                {isExpired
                  ? "This item has expired"
                  : "This item is expiring soon"}
              </div>
            </div>
          )}

          <div className="bg-dracula-current-line rounded-xl p-4 border border-dracula-selection">
            <div className="flex items-center gap-2 text-sm text-dracula-comment mb-2">
              <Scale className="w-4 h-4" />
              Quantity
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-dracula-cyan">
                {item.quantity}
              </span>
              <span className="text-lg text-dracula-foreground">
                {item.display_measurement_unit}
              </span>
            </div>
          </div>

          {item.description && (
            <div>
              <div className="text-sm text-dracula-comment mb-1.5">
                Description
              </div>
              <p className="text-dracula-foreground">{item.description}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            {item.purchase_price !== null && (
              <div className="bg-dracula-current-line rounded-lg p-3 border border-dracula-selection">
                <div className="flex items-center gap-1.5 text-xs text-dracula-comment mb-1">
                  <DollarSign className="w-3 h-3" />
                  Purchase price
                </div>
                <div className="text-lg font-bold text-dracula-green font-mono">
                  ${item.purchase_price?.toFixed(2) ?? "0.00"}
                </div>
              </div>
            )}

            {item.expiration_date && (
              <div className="bg-dracula-current-line rounded-lg p-3 border border-dracula-selection">
                <div className="flex items-center gap-1.5 text-xs text-dracula-comment mb-1">
                  <CalendarClock className="w-3 h-3" />
                  Expiration
                </div>
                <div
                  className={`text-sm font-semibold ${
                    isExpired
                      ? "text-dracula-red"
                      : isExpiringSoon
                        ? "text-dracula-orange"
                        : "text-dracula-foreground"
                  }`}
                >
                  {new Date(item.expiration_date).toLocaleDateString()}
                </div>
              </div>
            )}
          </div>

          {item.tags && (
            <div>
              <div className="text-sm text-dracula-comment mb-2 flex items-center gap-1.5">
                <TagIcon className="w-3 h-3" />
                Tags
              </div>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
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
                    <TagDialog
                      tag={tag}
                      mode="update"
                      trigger={
                        <div className="cursor-pointer m-0 p-0 flex">
                          {tag.name}
                          <X
                            size={15}
                            className="cursor-pointer ml-2"
                            onClick={() => {
                              update({
                                id: item.id,
                                payload: {
                                  ...item,
                                  tag_ids: item.tags
                                    .filter((_tag) => _tag.id != tag.id)
                                    .map((tag) => tag.id),
                                },
                              });
                            }}
                          />
                        </div>
                      }
                    />
                  </span>
                ))}
                <TagDialog
                  mode="create"
                  targetId={item.id}
                  targetType="item"
                  trigger={
                    <span className="cursor-pointer inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-medium bg-dracula-background border border-dracula-selection hover:border-amber-200 duration-200 transition-all">
                      <Plus size={15} />
                    </span>
                  }
                />
              </div>
            </div>
          )}

          <div className="pt-3 border-t border-dracula-selection text-xs text-dracula-comment space-y-1">
            <div>Created: {new Date(item.created_at).toLocaleString()}</div>
            <div>Updated: {new Date(item.updated_at).toLocaleString()}</div>
          </div>

          <div className="flex gap-2 pt-2">
            <ItemDialog
              mode="update"
              item={item}
              trigger={
                <button className="cursor-pointer flex-1 flex items-center justify-center gap-2 bg-dracula-purple hover:bg-dracula-purple/90 text-dracula-background font-semibold px-4 py-2.5 rounded-lg transition-colors text-sm">
                  <Edit className="w-4 h-4" />
                  Edit item
                </button>
              }
            />
            <button
              onClick={() => {
                if (
                  confirm(
                    "Are you sure you want to delete this item? This action cannot be undone."
                  )
                ) {
                  deleteItem({ id: item.id, force: true });
                  onOpenChange(false);
                }
              }}
              disabled={isPending}
              className="cursor-pointer flex items-center justify-center gap-2 bg-dracula-red/10 hover:bg-dracula-red/20 text-dracula-red font-semibold px-4 py-2.5 rounded-lg transition-colors text-sm border border-dracula-red/30 disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
