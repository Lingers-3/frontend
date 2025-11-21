import { Link } from "react-router";
import { useItemTypesFull } from "~/hooks/inventory-hooks";
import { ItemTypeCard } from "./ItemTypeCard";
import { Button } from "~/components/ui/button";
import ItemTypeDialog from "~/pages/inventory/itemTypes/ItemTypeDialog";
import { useSeedDatabase } from "../__seed";
import { PlusCircle } from "lucide-react";

export default function TypesIndex() {
  const { data: itemTypes, isLoading, isError } = useItemTypesFull();

  const { seed } = useSeedDatabase();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="bg-dracula-current-line rounded-xl h-72 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-dracula-red">
        <p className="text-lg font-medium">Inventory loading error</p>
      </div>
    );
  }

  if (!itemTypes || itemTypes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[70vh] w-full p-8 rounded-xl border-2 border-dashed border-dracula-current-line/50 bg-dracula-current-line/20">
        <PlusCircle className="w-12 h-12 text-dracula-purple mb-4 opacity-75" />
        <h2 className="text-xl font-semibold text-dracula-foreground mb-2">
          No Item Types Found
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
                Add First Item Type
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
  }

  return (
    <>
      <header className="flex justify-between w-full mb-6">
        <div className="flex items-center gap-4 text-dracula-foreground">
          <h1 className="ml-1 text-2xl font-bold">
            Item types
          </h1>
          <div className="text-dracula-current-line select-none">|</div>
          <p className="text-lg text-dracula-orange font-medium">
            {itemTypes?.length ?? 0} Total
          </p>
        </div>
        <ItemTypeDialog
          mode="create"
          trigger={
            <Button className="bg-dracula-purple hover:bg-dracula-purple/90 text-dracula-background font-bold shadow-md gap-2 rounded-xl">
              <PlusCircle className="w-5 h-5" />
              Add item type
            </Button>
          }
        />
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {itemTypes?.map((type) => (
          <Link key={type.id} to={`${type.id}`} className="block">
            <ItemTypeCard itemType={type} />
          </Link>
        ))}
      </div>
    </>
  );
}
