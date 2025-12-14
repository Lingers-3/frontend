import { Package, Search } from "lucide-react";
import { useState } from "react";
import { ItemCard } from "../items/ItemCard";
import ItemDialog from "../items/ItemDialog";
import type { ItemTypeFull } from "~/services/itemType/types";
import { Button } from "~/components/ui/button";
import { type ItemsFilterState, ItemsFilter } from "../items/ItemsFilter";

interface ItemTypeItemsGridProps {
  parsedId: number;
  type: ItemTypeFull;
}

export function ItemTypeItemsGrid({ parsedId, type }: ItemTypeItemsGridProps) {
  const [filterState, setFilterState] = useState<ItemsFilterState>({
    search: "",
    sortDirection: "asc",
    sortBy: "name",
    tagIds: [],
  });

  const filteredItems = type.items.filter((item) => {
    if (filterState.search) {
      const searchLower = filterState.search.toLowerCase();
      const typeNameMatch = type.name.toLowerCase().includes(searchLower);
      const descriptionMatch = item.description
        ?.toLowerCase()
        .includes(searchLower);

      if (!typeNameMatch && !descriptionMatch) return false;
    }

    if (filterState.tagIds.length > 0) {
      const itemTagIds = item.tags.map((t) => t.id);
      const hasMatchingTag = filterState.tagIds.some((id) =>
        itemTagIds.includes(id)
      );
      if (!hasMatchingTag) return false;
    }

    return true;
  });

  const sortedItems = filteredItems.sort((a, b) => {
    let compare = 0;

    if (filterState.sortBy === "name") {
      compare = type.name.localeCompare(type.name);
      if (compare === 0) {
        compare = (a.id || 0) - (b.id || 0);
      }
    } else if (filterState.sortBy === "expiration") {
      const dateA = a.expiration_date || "";
      const dateB = b.expiration_date || "";

      if (dateA === "" && dateB === "") compare = 0;
      else if (dateA === "") compare = 1;
      else if (dateB === "") compare = -1;
      else compare = dateA.localeCompare(dateB);
    }

    return filterState.sortDirection === "asc" ? compare : -compare;
  });

  return (
    <main className="w-full">
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            Items
            <span className="text-sm font-normal text-dracula-comment bg-dracula-current-line px-3 py-1 rounded-full">
              {sortedItems.length}
              {sortedItems.length !== type.items.length && (
                <span className="text-dracula-comment/60 ml-1">
                  / {type.items.length}
                </span>
              )}
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

        {(type.items.length > 0 ||
          filterState.search ||
          filterState.tagIds.length > 0) && (
          <ItemsFilter state={filterState} onChange={setFilterState} />
        )}
      </div>

      {sortedItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-4">
          {sortedItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-dracula-selection rounded-2xl text-dracula-comment py-20 bg-dracula-current-line/10">
          {type.items.length === 0 ? (
            <>
              <Package className="w-16 h-16 mb-3 opacity-40" />
              <p className="text-lg">No items found in this category.</p>
              <p className="text-sm mt-1">
                Add your first item to get started.
              </p>
            </>
          ) : (
            <>
              <Search className="w-16 h-16 mb-3 opacity-40" />
              <p className="text-lg">No items match your filters.</p>
              <Button
                variant="link"
                onClick={() =>
                  setFilterState({
                    search: "",
                    sortDirection: "asc",
                    sortBy: "name",
                    tagIds: [],
                  })
                }
                className="text-dracula-purple mt-2"
              >
                Clear filters
              </Button>
            </>
          )}
        </div>
      )}
    </main>
  );
}
