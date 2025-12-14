import { Link } from "react-router";
import { useState } from "react";
import { useItemTypesFull } from "~/hooks/inventory-hooks";
import { ItemTypeCard } from "./ItemTypeCard";
import { Button } from "~/components/ui/button";
import ItemTypeDialog from "~/pages/inventory/itemTypes/ItemTypeDialog";
import { useSeedDatabase } from "../__seed";
import { PlusCircle, Search } from "lucide-react";
import { ItemTypesFilter, type FilterState } from "./ItemTypesFilter";

export default function ItemTypesIndex() {
  const { data: itemTypes, isLoading, isError } = useItemTypesFull();
  const { seed } = useSeedDatabase();

  const [filterState, setFilterState] = useState<FilterState>({
    search: "",
    sort: "asc",
    tagIds: [],
  });

  const filteredTypes = itemTypes?.filter((type) => {
    if (
      filterState.search &&
      !type.name.toLowerCase().includes(filterState.search.toLowerCase())
    ) {
      return false;
    }

    if (filterState.tagIds.length > 0) {
      const typeTagIds = type.tags.map((t) => t.id);
      const hasMatchingTag = filterState.tagIds.some((id) =>
        typeTagIds.includes(id)
      );
      if (!hasMatchingTag) return false;
    }

    return true;
  });

  const sortedTypes = filteredTypes?.sort((a, b) => {
    const compare = a.name.localeCompare(b.name);
    return filterState.sort === "asc" ? compare : -compare;
  });

  const NoItemTypes = () => (
    <div className="flex flex-col items-center justify-center h-full min-h-[70vh] w-full p-8 rounded-xl border-2 border-dashed border-dracula-current-line/50 bg-dracula-current-line/20">
      <PlusCircle className="w-12 h-12 text-dracula-purple mb-4 opacity-75" />
      <h2 className="text-xl font-semibold text-dracula-foreground mb-2">
        No item types found
      </h2>
      <p className="text-dracula-foreground/80 mb-6 text-center max-w-sm">
        It looks like you haven't created any item types yet. Get started by
        defining your first type.
      </p>
      <div className="flex gap-4">
        <ItemTypeDialog
          mode="create"
          trigger={
            <Button className="bg-dracula-purple hover:bg-dracula-purple/90 text-dracula-background font-bold shadow-lg gap-2 rounded-xl">
              <PlusCircle className="w-5 h-5" />
              Add first item type
            </Button>
          }
        />
        <Button
          className="bg-dracula-comment hover:bg-dracula-comment/80 text-dracula-background font-bold shadow-md gap-2 rounded-xl"
          onClick={seed}
        >
          Seed db [dev]
        </Button>
      </div>
    </div>
  );

  const ItemTypesList = () => (
    <>
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full mb-6 gap-4">
        <div className="flex items-center gap-4 text-dracula-foreground">
          <h1 className="ml-1 text-2xl font-bold">Item types</h1>
          <div className="text-dracula-current-line select-none">|</div>
          <p className="text-lg text-dracula-orange font-medium">
            {sortedTypes?.length}
            <span className="text-dracula-comment text-sm ml-1">
              / {itemTypes?.length} Total
            </span>
          </p>
        </div>
        <ItemTypeDialog
          mode="create"
          trigger={
            <Button className="bg-dracula-purple hover:bg-dracula-purple/90 text-dracula-background font-bold shadow-md gap-2 rounded-xl w-full sm:w-auto">
              <PlusCircle className="w-5 h-5" />
              Add item type
            </Button>
          }
        />
      </header>

      <ItemTypesFilter state={filterState} onChange={setFilterState} />

      {sortedTypes?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-dracula-comment">
          <Search className="w-10 h-10 mb-2 opacity-50" />
          <p>No item types match your filters.</p>
          <Button
            variant="link"
            onClick={() =>
              setFilterState({ search: "", sort: "asc", tagIds: [] })
            }
            className="text-dracula-purple mt-2"
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedTypes?.map((type) => (
            <Link key={type.id} to={`${type.id}`} className="block">
              <ItemTypeCard itemType={type} />
            </Link>
          ))}
        </div>
      )}
    </>
  );

  return (
    <>
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="bg-dracula-current-line rounded-xl h-72 animate-pulse"
            />
          ))}
        </div>
      )}

      {isError && (
        <div className="flex flex-col items-center justify-center h-96 text-dracula-red">
          <p className="text-lg font-medium">Inventory loading error</p>
        </div>
      )}

      {!isLoading && !isError && (!itemTypes || itemTypes.length === 0) && (
        <NoItemTypes />
      )}

      {!isLoading && !isError && itemTypes && itemTypes.length > 0 && (
        <ItemTypesList />
      )}
    </>
  );
}
