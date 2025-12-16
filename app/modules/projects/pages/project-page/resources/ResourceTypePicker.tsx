import { Search, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import { Input } from "~/components/ui/input";
import { useItemTypesFull } from "~/modules/inventory/hooks/inventory-hooks";
import type { ItemTypeFull } from "~/modules/inventory/services/item-type/types";
import { picture } from "~/modules/inventory/services/picture/picture";

interface ResourceTypePickerProps {
  onSelect: (itemType: ItemTypeFull) => void;
}

export default function ResourceTypePicker({
  onSelect,
}: ResourceTypePickerProps) {
  const { data: itemTypes, isLoading } = useItemTypesFull();
  const [search, setSearch] = useState("");

  const filteredTypes = itemTypes?.filter((type) =>
    type.name.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="h-60 animate-pulse bg-dracula-current-line/20 rounded-xl" />
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-[10px] h-4 w-4 text-dracula-comment" />
        <Input
          placeholder="Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 bg-dracula-current-line border-dracula-selection text-dracula-foreground"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-1">
        {filteredTypes?.map((type) => (
          <button
            key={type.id}
            onClick={() => onSelect(type)}
            className="cursor-pointer flex flex-col text-left bg-dracula-current-line border border-dracula-selection rounded-xl overflow-hidden hover:border-dracula-purple transition-all group"
          >
            <div className="h-24 bg-dracula-background w-full flex items-center justify-center relative">
              {type.picture_id ? (
                <img
                  src={picture.url(type.picture_hash) ?? ""}
                  alt={type.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <ImageIcon className="w-8 h-8 text-dracula-comment/50 group-hover:text-dracula-purple/50 transition-colors" />
              )}
            </div>

            <div className="p-3">
              <h4 className="font-bold text-dracula-foreground text-sm line-clamp-1">
                {type.name}
              </h4>
              <p className="text-xs text-dracula-comment mt-1">
                Unit:{" "}
                <span className="text-dracula-pink">
                  {type.display_measurement_unit}
                </span>
              </p>
            </div>
          </button>
        ))}

        {filteredTypes?.length === 0 && (
          <div className="col-span-2 text-center py-8 text-dracula-comment text-sm">
            No item types found.
          </div>
        )}
      </div>
    </div>
  );
}
