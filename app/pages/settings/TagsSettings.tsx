import { Loader2, Plus, Search, Tag as TagIcon, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useDeleteTag, useTags } from "~/hooks/inventory-hooks";
import { cn } from "~/lib/utils";
import type { Tag } from "~/services/tag/types";
import TagDialog from "../inventory/tags/TagDialog";

export function TagsSettings() {
  const { data: tags, isLoading } = useTags();
  const { mutate: deleteTag, isPending: isDeleting } = useDeleteTag();

  const [view, setView] = useState<"types" | "items">("types");
  const [searchQuery, setSearchQuery] = useState("");

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="animate-spin text-dracula-comment" />
      </div>
    );
  }

  const filteredByView =
    (tags as Tag[] | undefined)?.filter((tag) => {
      const isOrphan =
        (!tag.item_ids || tag.item_ids.length === 0) &&
        (!tag.item_type_ids || tag.item_type_ids.length === 0);

      if (isOrphan) return true;

      if (view === "items") {
        return tag.item_ids && tag.item_ids.length > 0;
      } else {
        return tag.item_type_ids && tag.item_type_ids.length > 0;
      }
    }) || [];

  const displayedTags = filteredByView.filter((tag) =>
    tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative flex h-10 w-full items-center rounded-lg bg-dracula-current-line p-1">
        <div
          className={cn(
            "absolute h-8 w-[calc(50%-4px)] rounded-md bg-dracula-background shadow-sm transition-all duration-300 ease-in-out",
            view === "types" ? "left-1" : "left-[calc(50%+2px)]"
          )}
        />
        <button
          onClick={() => setView("types")}
          className={cn(
            "relative z-10 flex-1 text-center text-sm transition-colors duration-200",
            view === "types"
              ? "text-dracula-foreground font-medium"
              : "text-dracula-comment hover:text-dracula-foreground/80"
          )}
        >
          Types tags
        </button>
        <button
          onClick={() => setView("items")}
          className={cn(
            "relative z-10 flex-1 text-center text-sm transition-colors duration-200",
            view === "items"
              ? "text-dracula-foreground font-medium"
              : "text-dracula-comment hover:text-dracula-foreground/80"
          )}
        >
          Items tags
        </button>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-dracula-comment" />
          <Input
            placeholder="Search tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-dracula-current-line border-dracula-selection text-dracula-foreground placeholder:text-dracula-comment focus-visible:ring-dracula-purple"
          />
        </div>

        <TagDialog
          mode="create"
          trigger={
            <Button
              size="icon"
              className="bg-dracula-purple hover:bg-dracula-purple/80 text-white shrink-0"
            >
              <Plus className="h-5 w-5" />
            </Button>
          }
        />
      </div>

      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
        {displayedTags.length === 0 ? (
          <div className="text-center py-8 text-dracula-comment text-sm">
            No tags found in this category.
          </div>
        ) : (
          displayedTags.map((tag) => (
            <div
              key={tag.id}
              className="flex items-center justify-between p-3 rounded-lg bg-dracula-current-line/40 border border-dracula-selection hover:border-dracula-purple/50 transition-colors group"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div
                  className="w-4 h-4 rounded-full shrink-0 border border-white/10 shadow-sm"
                  style={{ backgroundColor: `#${tag.color}` || "#ffffff" }}
                />
                <div className="flex flex-col truncate">
                  <span className="text-sm font-medium text-dracula-foreground truncate">
                    {tag.name}
                  </span>
                  <span className="text-[10px] text-dracula-comment">
                    Used in: {tag.item_ids?.length || 0} items,{" "}
                    {tag.item_type_ids?.length || 0} types
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                <TagDialog
                  mode="update"
                  tag={tag}
                  trigger={
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-dracula-cyan hover:text-dracula-cyan hover:bg-dracula-cyan/10"
                    >
                      <TagIcon className="h-4 w-4" />
                    </Button>
                  }
                />

                <Button
                  variant="ghost"
                  size="icon"
                  disabled={isDeleting}
                  onClick={() => {
                    if (
                      confirm(
                        "Are you sure you want to delete this tag globally?"
                      )
                    ) {
                      deleteTag(tag.id);
                    }
                  }}
                  className="h-8 w-8 text-dracula-red hover:text-dracula-red hover:bg-dracula-red/10"
                >
                  {isDeleting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
