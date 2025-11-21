import { AlertTriangle, Biohazard, Image as ImageIcon } from "lucide-react";

import type { ItemTypeFull } from "~/services/itemType/types";
import type { ItemFull } from "~/services/item/types";

import { ItemTypeCardOptions } from "./ItemTypeCardOptions";

const isItemSmelling = (item: ItemFull): boolean => {
  if (!item.expiration_date) return false;
  const now = new Date();
  const exp = new Date(item.expiration_date);
  const diffTime = exp.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 3;
};

interface ItemTypeCardProps {
  itemType: ItemTypeFull;
}

export const ItemTypeCard = ({ itemType }: ItemTypeCardProps) => {
  const totalQuantity = itemType.items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const isShortage =
    itemType.shortage_threshold !== null &&
    totalQuantity <= itemType.shortage_threshold;

  const hasSmellingItems = itemType.items.some(isItemSmelling);

  const visibleTags = itemType.tags.slice(0, 3);
  const hiddenTagsCount = itemType.tags.length - 3;

  return (
    <div className="group relative flex flex-col bg-dracula-current-line rounded-3xl border border-dracula-selection shadow-sm hover:shadow-md hover:border-dracula-purple transition-all duration-200 overflow-hidden">
      <div className="relative h-40 w-full bg-dracula-background flex items-center justify-center overflow-hidden">
        {itemType.picture_id ? (
          <img
            src={`/api/images/${itemType.picture_id}`}
            alt={itemType.name}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex flex-col items-center text-dracula-comment">
            <ImageIcon className="w-10 h-10 mb-1" />
            <span className="text-xs font-medium">No Image</span>
          </div>
        )}

        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {isShortage && (
            <span
              title="Deficit!"
              className="mt-1 mr-1 bg-dracula-red text-dracula-background text-xs font-bold px-2 py-1 rounded-lg backdrop-blur-sm flex items-center gap-1 shadow-sm"
            >
              <AlertTriangle className="w-3 h-3" />
              Low stock
            </span>
          )}

          {hasSmellingItems && (
            <span
              title="Expiration date approaching"
              className="mt-1 mr-1 bg-dracula-yellow text-dracula-background text-xs font-bold px-2 py-1 rounded-lg backdrop-blur-sm flex items-center gap-1 shadow-sm"
            >
              <Biohazard className="w-3 h-3" />
              Check expiry
            </span>
          )}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow bg-dracula-background/50">
        <div className="flex justify-between items-start mb-2">
          <h3
            className="w-full font-bold text-dracula-foreground text-lg leading-tight line-clamp-1"
            title={itemType.name}
          >
            {itemType.name}
          </h3>

          <ItemTypeCardOptions itemType={itemType} />
        </div>
        <div className="mb-4">
          <div className="flex items-baseline gap-1">
            <span
              className={`text-2xl font-extrabold ${
                isShortage ? "text-dracula-red" : "text-dracula-green"
              }`}
            >
              {totalQuantity}
            </span>
            <span className="text-sm font-medium text-dracula-text-secondary">
              {itemType.display_measurement_unit}
            </span>
          </div>

          <p className="text-xs text-dracula-text-secondary mt-0.5">
            {itemType.items.length} items in stock
          </p>
        </div>

        <div className="mt-auto pt-2">
          <div className="flex flex-wrap gap-1.5">
            {visibleTags.length > 0 ? (
              visibleTags.map((tag) => (
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
              ))
            ) : (
              <span className="text-xs text-dracula-text-secondary italic">
                No tags
              </span>
            )}

            {hiddenTagsCount > 0 && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-dracula-background text-dracula-comment border border-dracula-selection">
                +{hiddenTagsCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
