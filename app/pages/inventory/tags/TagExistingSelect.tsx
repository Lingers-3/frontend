import { Loader2, Plus, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "~/components/ui/input";
import {
  useTags,
  useUpdateItem,
  useUpdateItemType,
} from "~/hooks/inventory-hooks";
import { cn } from "~/lib/utils";
import type { Tag } from "~/services/tag/types";

interface TagExistingSelectProps {
  targetId: number;
  targetType: "item" | "item_type";
  currentTagIds: number[];
  onClose: () => void;
}

export function TagExistingSelect({
  targetId,
  targetType,
  currentTagIds,
  onClose,
}: TagExistingSelectProps) {
  const { data: tags, isLoading } = useTags();
  const [searchQuery, setSearchQuery] = useState("");

  const { mutate: updateItem, isPending: isUpdatingItem } = useUpdateItem();
  const { mutate: updateItemType, isPending: isUpdatingType } =
    useUpdateItemType();

  const isPending = isUpdatingItem || isUpdatingType;

  const unattachedTags =
    (tags as Tag[] | undefined)?.filter((tag) => {
      if (targetType === "item") {
        return !tag.item_ids?.includes(targetId);
      } else {
        return !tag.item_type_ids?.includes(targetId);
      }
    }) || [];

  const filteredTags = unattachedTags.filter((tag) =>
    tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectTag = (tagId: number) => {
    const newTagIds = Array.from(new Set([...currentTagIds, tagId]));

    const onSuccess = () => {
      toast.success("Tag attached successfully");
      onClose();
    };

    const onError = () => {
      toast.error("Failed to attach tag");
    };

    if (targetType === "item") {
      updateItem(
        { id: targetId, payload: { tag_ids: newTagIds } },
        { onSuccess, onError }
      );
    } else {
      updateItemType(
        { id: targetId, payload: { tag_ids: newTagIds } },
        { onSuccess, onError }
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="animate-spin text-dracula-comment" />
      </div>
    );
  }

  return (
    <div className="space-y-3 mt-2">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-dracula-comment" />
        <Input
          placeholder="Search tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 bg-dracula-current-line border-dracula-selection text-dracula-foreground placeholder:text-dracula-comment focus-visible:ring-dracula-purple"
          autoFocus
        />
      </div>

      <div className="max-h-[300px] overflow-y-auto pr-1 space-y-2">
        {filteredTags.length === 0 ? (
          <div className="text-center py-4 text-dracula-comment text-sm">
            {searchQuery
              ? "No tags found matching your search."
              : "All available tags are already added."}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2">
            {filteredTags.map((tag) => (
              <button
                key={tag.id}
                disabled={isPending}
                onClick={() => handleSelectTag(tag.id)}
                className={cn(
                  "flex items-center gap-3 p-2 rounded-md border text-left transition-all",
                  "bg-dracula-current-line/40 border-dracula-selection hover:border-dracula-purple hover:bg-dracula-current-line",
                  "disabled:opacity-50 disabled:cursor-not-allowed group"
                )}
              >
                <div
                  className="w-4 h-4 rounded-full shrink-0 border border-white/10 shadow-sm"
                  style={{ backgroundColor: `#${tag.color}` || "#ffffff" }}
                />
                <span className="text-sm text-dracula-foreground truncate font-medium flex-1">
                  {tag.name}
                </span>

                {isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin text-dracula-purple" />
                ) : (
                  <Plus className="w-4 h-4 opacity-0 group-hover:opacity-100 text-dracula-green transition-opacity" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
