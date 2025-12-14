import {
  ArrowDownAZ,
  ArrowUpZA,
  Calendar,
  Filter,
  Search,
  Tag,
  Type,
  X,
} from "lucide-react";
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
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { useTags } from "~/hooks/inventory-hooks";
import { cn } from "~/lib/utils";

export interface ItemsFilterState {
  search: string;
  sortDirection: "asc" | "desc";
  sortBy: "name" | "expiration";
  tagIds: number[];
}

interface ItemsFilterProps {
  state: ItemsFilterState;
  onChange: (newState: ItemsFilterState) => void;
}

export function ItemsFilter({ state, onChange }: ItemsFilterProps) {
  const [open, setOpen] = useState(false);
  const { data: allTags } = useTags();

  const [internalState, setInternalState] = useState<ItemsFilterState>(state);

  useEffect(() => {
    if (open) {
      setInternalState(state);
    }
  }, [open, state]);

  const updateSearch = (val: string) =>
    setInternalState((prev) => ({ ...prev, search: val }));

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
    const emptyState: ItemsFilterState = {
      search: "",
      sortDirection: "asc",
      sortBy: "name",
      tagIds: [],
    };
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
          className="mt-2 w-full flex items-center justify-between p-3 mb-6 bg-dracula-current-line/40 hover:bg-dracula-current-line/60 border border-dracula-selection rounded-xl transition-all cursor-pointer group"
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
            {state.sortBy === "expiration" ? (
              <Calendar className="w-4 h-4 text-dracula-cyan" />
            ) : (
              <Type className="w-4 h-4 text-dracula-comment" />
            )}
            {state.sortDirection === "asc" ? (
              <ArrowDownAZ className="w-4 h-4 text-dracula-comment" />
            ) : (
              <ArrowUpZA className="w-4 h-4 text-dracula-orange" />
            )}
            <Filter className="w-4 h-4 text-dracula-comment" />
          </div>
        </div>
      </DialogTrigger>

      <DialogOverlay className="fixed inset-0 bg-black/10 backdrop-blur-sm" />

      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="rounded-2xl bg-dracula-background border-dracula-selection max-w-lg"
      >
        <DialogHeader>
          <DialogTitle className="text-dracula-foreground">
            Filter & Sort Items
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-2">
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-dracula-comment uppercase tracking-wider">
              Search (Type Name)
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-dracula-comment" />
              <Input
                placeholder="Search..."
                value={internalState.search}
                onChange={(e) => updateSearch(e.target.value)}
                className="pl-9 h-10 bg-dracula-current-line border-dracula-selection text-dracula-foreground"
              />
              {internalState.search && (
                <X
                  className="absolute right-3 top-3 h-4 w-4 text-dracula-comment cursor-pointer hover:text-dracula-red"
                  onClick={() => updateSearch("")}
                />
              )}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-xs font-semibold text-dracula-comment uppercase tracking-wider">
              Sort By
            </Label>
            <RadioGroup
              value={internalState.sortBy}
              onValueChange={(val) =>
                setInternalState((p) => ({
                  ...p,
                  sortBy: val as "name" | "expiration",
                }))
              }
              className="grid grid-cols-2 gap-2"
            >
              <div>
                <RadioGroupItem
                  value="name"
                  id="sort-name"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="sort-name"
                  className="flex items-center justify-center gap-2 p-2 rounded-lg border bg-dracula-current-line/20 border-dracula-selection text-dracula-comment hover:bg-dracula-current-line peer-data-[state=checked]:border-dracula-purple peer-data-[state=checked]:text-dracula-purple cursor-pointer transition-all"
                >
                  <Type className="w-4 h-4" />
                  Type Name
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="expiration"
                  id="sort-exp"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="sort-exp"
                  className="flex items-center justify-center gap-2 p-2 rounded-lg border bg-dracula-current-line/20 border-dracula-selection text-dracula-comment hover:bg-dracula-current-line peer-data-[state=checked]:border-dracula-cyan peer-data-[state=checked]:text-dracula-cyan cursor-pointer transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  Expiration
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label className="text-xs font-semibold text-dracula-comment uppercase tracking-wider">
              Sort Direction
            </Label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() =>
                  setInternalState((p) => ({ ...p, sortDirection: "asc" }))
                }
                className={cn(
                  "flex items-center justify-center gap-2 p-2 rounded-lg border transition-all text-sm font-medium",
                  internalState.sortDirection === "asc"
                    ? "bg-dracula-purple/20 border-dracula-purple text-dracula-purple"
                    : "bg-dracula-current-line/40 border-dracula-selection text-dracula-comment hover:bg-dracula-current-line"
                )}
              >
                <ArrowDownAZ className="w-4 h-4" />
                Ascending
              </button>
              <button
                onClick={() =>
                  setInternalState((p) => ({ ...p, sortDirection: "desc" }))
                }
                className={cn(
                  "flex items-center justify-center gap-2 p-2 rounded-lg border transition-all text-sm font-medium",
                  internalState.sortDirection === "desc"
                    ? "bg-dracula-orange/20 border-dracula-orange text-dracula-orange"
                    : "bg-dracula-current-line/40 border-dracula-selection text-dracula-comment hover:bg-dracula-current-line"
                )}
              >
                <ArrowUpZA className="w-4 h-4" />
                Descending
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-xs font-semibold text-dracula-comment uppercase tracking-wider">
                Filter by Tags
              </Label>
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

            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-1">
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
                      style={{
                        backgroundColor: `#${tag.color}` || "#ffffff",
                      }}
                    />
                    {tag.name}
                  </button>
                );
              })}
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
