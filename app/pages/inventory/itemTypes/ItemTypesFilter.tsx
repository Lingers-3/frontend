import { ArrowDownAZ, ArrowUpZA, Filter, Search, Tag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { useTags } from "~/hooks/inventory-hooks";
import { cn } from "~/lib/utils";

export interface FilterState {
  search: string;
  sort: "asc" | "desc";
  tagIds: number[];
}

interface ItemTypesFilterProps {
  state: FilterState; 
  onChange: (newState: FilterState) => void;
}

export function ItemTypesFilter({ state, onChange }: ItemTypesFilterProps) {
  const [open, setOpen] = useState(false);
  const { data: allTags } = useTags();

  const [internalState, setInternalState] = useState<FilterState>(state);

  useEffect(() => {
    if (open) {
      setInternalState(state);
    }
  }, [open, state]);

  const updateSearch = (val: string) =>
    setInternalState((prev) => ({ ...prev, search: val }));

  const updateSort = (val: "asc" | "desc") =>
    setInternalState((prev) => ({ ...prev, sort: val }));

  const toggleTag = (id: number) => {
    setInternalState((prev) => {
      const newTags = prev.tagIds.includes(id)
        ? prev.tagIds.filter((t) => t !== id)
        : [...prev.tagIds, id];
      return { ...prev, tagIds: newTags };
    });
  };

  const applyFilters = () => {
    onChange(internalState);
    setOpen(false);
  };

  const resetFilters = () => {
    const emptyState: FilterState = { search: "", sort: "asc", tagIds: [] };
    setInternalState(emptyState); 
    onChange(emptyState);
    setOpen(false);
  };

  const selectedTagsObjects = allTags?.filter((t) =>
    state.tagIds.includes(t.id)
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          role="button"
          className="w-full flex items-center justify-between p-3 mb-6 bg-dracula-current-line/40 hover:bg-dracula-current-line/60 border border-dracula-selection rounded-xl transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-3 flex-1 overflow-hidden">
            <Search className="w-5 h-5 text-dracula-comment group-hover:text-dracula-purple transition-colors" />

            {state.search === "" && state.tagIds.length === 0 ? (
              <span className="text-dracula-comment text-sm">
                Search, filter by tags, or sort...
              </span>
            ) : (
              <div className="flex gap-2 items-center overflow-x-auto no-scrollbar mask-gradient-right">
                {state.search && (
                  <Badge className="bg-dracula-purple text-dracula-background hover:bg-dracula-purple gap-1 whitespace-nowrap">
                    "{state.search}"
                  </Badge>
                )}

                {selectedTagsObjects?.map((tag) => (
                  <Badge
                    key={tag.id}
                    variant="outline"
                    className="border-dracula-pink/50 text-dracula-pink gap-1 whitespace-nowrap"
                    style={{
                      borderColor: tag.color ? `#${tag.color}` : undefined,
                      color: tag.color ? `#${tag.color}` : undefined,
                    }}
                  >
                    <Tag className="w-3 h-3" />
                    {tag.name}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 pl-2 border-l border-dracula-selection/50 ml-2">
            {state.sort === "asc" ? (
              <ArrowDownAZ className="w-4 h-4 text-dracula-comment" />
            ) : (
              <ArrowUpZA className="w-4 h-4 text-dracula-orange" />
            )}
            <Filter className="w-4 h-4 text-dracula-comment" />
          </div>
        </div>
      </DialogTrigger>

      <DialogOverlay className="fixed inset-0 bg-black/10 backdrop-blur-sm" />

      <DialogContent className="rounded-2xl bg-dracula-background border-dracula-selection max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-dracula-foreground">
            Filter & Sort
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-2">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-dracula-comment uppercase tracking-wider">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-dracula-comment" />
              <Input
                placeholder="Item type name..."
                value={internalState.search}
                onChange={(e) => updateSearch(e.target.value)}
                className="pl-9 h-10 bg-dracula-current-line border-dracula-selection text-dracula-foreground"
                autoFocus
              />
              {internalState.search && (
                <X
                  className="absolute right-3 top-3 h-4 w-4 text-dracula-comment cursor-pointer hover:text-dracula-red"
                  onClick={() => updateSearch("")}
                />
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-dracula-comment uppercase tracking-wider">
              Sort Order
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => updateSort("asc")}
                className={cn(
                  "flex items-center justify-center gap-2 p-2 rounded-lg border transition-all text-sm font-medium",
                  internalState.sort === "asc"
                    ? "bg-dracula-purple/20 border-dracula-purple text-dracula-purple"
                    : "bg-dracula-current-line/40 border-dracula-selection text-dracula-comment hover:bg-dracula-current-line"
                )}
              >
                <ArrowDownAZ className="w-4 h-4" />
                Name (A-Z)
              </button>
              <button
                onClick={() => updateSort("desc")}
                className={cn(
                  "flex items-center justify-center gap-2 p-2 rounded-lg border transition-all text-sm font-medium",
                  internalState.sort === "desc"
                    ? "bg-dracula-orange/20 border-dracula-orange text-dracula-orange"
                    : "bg-dracula-current-line/40 border-dracula-selection text-dracula-comment hover:bg-dracula-current-line"
                )}
              >
                <ArrowUpZA className="w-4 h-4" />
                Name (Z-A)
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-dracula-comment uppercase tracking-wider">
                Filter by Tags
              </label>
              {internalState.tagIds.length > 0 && (
                <button
                  onClick={() =>
                    setInternalState((prev) => ({ ...prev, tagIds: [] }))
                  }
                  className="text-xs text-dracula-red hover:underline"
                >
                  Clear tags
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-1">
              {allTags?.map((tag) => {
                const isSelected = internalState.tagIds.includes(tag.id);
                return (
                  <button
                    key={tag.id}
                    onClick={() => toggleTag(tag.id)}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
                      isSelected
                        ? "bg-dracula-selection border-dracula-foreground text-dracula-foreground shadow-sm"
                        : "bg-dracula-current-line/20 border-dracula-selection text-dracula-comment hover:border-dracula-comment"
                    )}
                    style={
                      isSelected
                        ? {
                            borderColor: tag.color
                              ? `#${tag.color}`
                              : undefined,
                            backgroundColor: tag.color
                              ? `#${tag.color}20`
                              : undefined,
                          }
                        : {}
                    }
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: `#${tag.color}` || "#ffffff" }}
                    />
                    {tag.name}
                  </button>
                );
              })}
              {(!allTags || allTags.length === 0) && (
                <p className="text-dracula-comment text-sm italic">
                  No tags available.
                </p>
              )}
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button
              variant="ghost"
              onClick={resetFilters}
              className="text-dracula-comment hover:text-dracula-foreground"
            >
              Reset All
            </Button>
            <Button
              onClick={applyFilters}
              className="bg-dracula-purple hover:bg-dracula-purple/90 text-dracula-background font-bold"
            >
              Show Results
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
