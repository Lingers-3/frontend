import { Package } from "lucide-react";
import { ItemCard } from "../items/ItemCard";
import ItemDialog from "../items/ItemDialog";
import type { ItemTypeFull } from "~/services/itemType/types";

interface ItemTypeItemsGridProps {
  parsedId: number
  type: ItemTypeFull
}

export function ItemTypeItemsGrid({ parsedId, type }: ItemTypeItemsGridProps) {
  return (
    <main className="w-full">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          Items
          <span className="text-sm font-normal text-dracula-comment bg-dracula-current-line px-3 py-1 rounded-full">
            {type.items.length}
          </span>
        </h2>
        <ItemDialog
          mode="create"
          defaultItemTypeId={parsedId}
          trigger={
            <button className="cursor-pointer flex items-center gap-2 bg-dracula-purple hover:bg-dracula-purple/90 text-dracula-background font-semibold px-4 py-2.5 rounded-xl transition-colors text-sm shadow-lg">
              Add item
            </button>
          }
        />
      </div>

      {type.items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-4">
          {type.items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-dracula-selection rounded-2xl text-dracula-comment py-20">
          <Package className="w-16 h-16 mb-3 opacity-40" />
          <p className="text-lg">No items found in this category.</p>
          <p className="text-sm mt-1">Add your first item to get started.</p>
        </div>
      )}
    </main>
  );
}
