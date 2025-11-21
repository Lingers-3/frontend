import { useMemo, useState } from "react";
import { CalendarClock, AlertTriangle } from "lucide-react";
import type { ItemFull } from "~/services/item/types";
import { ItemInfoDialog } from "./ItemInfoDialog";
import { ItemCardOptions } from "./ItemCardOptions";

export const ItemCard = ({ item }: { item: ItemFull }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

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
    <div>
      <div
        onClick={() => setDialogOpen(true)}
        className="relative flex flex-col bg-dracula-foreground/10 rounded-2xl border border-dracula-selection p-4 hover:border-dracula-purple hover:shadow-lg hover:shadow-dracula-purple/10 transition-all cursor-pointer"
      >
        {(isExpiringSoon || isExpired) && (
          <div
            className={`absolute -top-2 -right-2 ${
              isExpired ? "bg-dracula-red" : "bg-dracula-orange"
            } text-dracula-background text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg z-10`}
          >
            <AlertTriangle className="w-3 h-3" />
            {isExpired ? "Expired" : "Soon"}
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="flex items-baseline gap-1.5 mb-3">
            <span className="text-3xl font-bold text-dracula-cyan">
              {item.quantity}
            </span>
            <span className="text-sm text-dracula-comment">
              {item.display_measurement_unit}
            </span>
          </div>
          <ItemCardOptions item={item} />
        </div>

        {item.description && (
          <p className="text-sm text-dracula-foreground mb-3 line-clamp-2 min-h-[2.5rem]">
            {item.description}
          </p>
        )}

        <div className="mt-auto space-y-2.5">
          {item.purchase_price !== null && (
            <div className="flex items-center justify-between text-xs">
              <span className="text-dracula-comment">Price</span>
              <span className="text-dracula-green font-mono font-semibold">
                ${item.purchase_price.toFixed(2)}
              </span>
            </div>
          )}

          {item.expiration_date && (
            <div
              className={`flex items-center gap-1.5 text-xs ${
                isExpired
                  ? "text-dracula-red font-bold"
                  : isExpiringSoon
                    ? "text-dracula-orange font-bold"
                    : "text-dracula-comment"
              }`}
            >
              <CalendarClock className="w-3 h-3" />
              <span>{new Date(item.expiration_date).toLocaleDateString()}</span>
            </div>
          )}

          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
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
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <ItemInfoDialog
        item={item}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
};
