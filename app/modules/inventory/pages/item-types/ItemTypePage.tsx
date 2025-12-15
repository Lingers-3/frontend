import { useMemo } from "react";
import { useParams, Link } from "react-router";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { useItemTypesFull } from "~/modules/inventory/hooks/inventory-hooks";
import { ItemTypeInfo } from "./item-type-info";
import { ItemTypeItemsGrid } from "./ItemTypeItemsGrid";

export default function ItemTypePage() {
  const { itemTypeId } = useParams<{ itemTypeId: string }>();
  const parsedId = Number(itemTypeId);

  const { data: itemTypes, isLoading, isError } = useItemTypesFull();

  const type = useMemo(
    () => itemTypes?.find((t) => t.id === parsedId),
    [itemTypes, parsedId]
  );

  if (!type) return null;

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-dracula-purple"></div>
      </div>
    );
  }

  if (isError || (!isLoading && !type)) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-dracula-red">
        <AlertTriangle className="w-12 h-12 mb-4" />
        <p className="text-lg font-medium">Item type not found</p>
        <Link
          to=".."
          relative="path"
          className="mt-4 flex items-center gap-2 text-dracula-cyan hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back to inventory
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row gap-6 bg-dracula-background text-dracula-foreground p-1">
      <ItemTypeInfo {...{ type }} />
      <ItemTypeItemsGrid {...{ parsedId, type }} />
    </div>
  );
}
