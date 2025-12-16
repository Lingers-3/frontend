import {
  Filter,
  Search,
  X,
  Calendar,
  Clock,
  ListOrdered,
  ArrowDownAZ,
  ArrowUpZA,
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
import { cn } from "~/lib/utils";
import { ProjectState } from "../../services/project/types";

export type ProjectSortOption =
  | "created_at"
  | "deadline"
  | "state"
  | "updated_at";

export interface ProjectFilterState {
  search: string;
  state: ProjectState | "All";
  sortBy: ProjectSortOption;
  sortDir: "asc" | "desc";
}

interface ProjectsFilterProps {
  state: ProjectFilterState;
  onChange: (newState: ProjectFilterState) => void;
}

export function ProjectsFilter({ state, onChange }: ProjectsFilterProps) {
  const [open, setOpen] = useState(false);
  const [internalState, setInternalState] = useState<ProjectFilterState>(state);

  useEffect(() => {
    if (open) {
      setInternalState(state);
    }
  }, [open, state]);

  const updateSearch = (val: string) =>
    setInternalState((prev) => ({ ...prev, search: val }));

  const updateState = (val: ProjectState | "All") =>
    setInternalState((prev) => ({ ...prev, state: val }));

  const updateSortBy = (val: ProjectSortOption) =>
    setInternalState((prev) => ({ ...prev, sortBy: val }));

  const updateSortDir = (val: "asc" | "desc") =>
    setInternalState((prev) => ({ ...prev, sortDir: val }));

  const applyFilters = () => {
    onChange(internalState);
    setOpen(false);
  };

  const resetFilters = () => {
    const emptyState: ProjectFilterState = {
      search: "",
      state: "All",
      sortBy: "updated_at",
      sortDir: "desc",
    };
    setInternalState(emptyState);
    onChange(emptyState);
    setOpen(false);
  };

  const getSortLabel = (key: ProjectSortOption) => {
    switch (key) {
      case "created_at":
        return "Created Date";
      case "deadline":
        return "Deadline";
      case "state":
        return "Status";
      case "updated_at":
        return "Last Updated";
      default:
        return key;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          role="button"
          className="w-full flex items-center justify-between p-3 mb-6 bg-dracula-current-line/40 hover:bg-dracula-current-line/60 border border-dracula-selection rounded-xl transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-3 flex-1 overflow-hidden">
            <Search className="w-5 h-5 text-dracula-comment group-hover:text-dracula-purple transition-colors" />

            {state.search === "" &&
            state.state === "All" &&
            state.sortBy === "updated_at" ? (
              <span className="text-dracula-comment text-sm">
                Search, filter, or sort...
              </span>
            ) : (
              <div className="flex gap-2 items-center overflow-x-auto no-scrollbar mask-gradient-right">
                {state.search && (
                  <Badge className="bg-dracula-purple text-dracula-background hover:bg-dracula-purple gap-1 whitespace-nowrap">
                    "{state.search}"
                  </Badge>
                )}

                {state.state !== "All" && (
                  <Badge
                    variant="outline"
                    className="border-dracula-cyan/50 text-dracula-cyan gap-1 whitespace-nowrap"
                  >
                    Status: {state.state}
                  </Badge>
                )}

                <Badge
                  variant="outline"
                  className="border-dracula-orange/50 text-dracula-orange gap-1 whitespace-nowrap"
                >
                  Sort: {getSortLabel(state.sortBy)} (
                  {state.sortDir === "asc" ? "Asc" : "Desc"})
                </Badge>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 pl-2 border-l border-dracula-selection/50 ml-2">
            <Filter className="w-4 h-4 text-dracula-comment" />
          </div>
        </div>
      </DialogTrigger>

      <DialogOverlay className="fixed inset-0 bg-black/10 backdrop-blur-sm" />

      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="rounded-2xl bg-dracula-background border-dracula-selection max-w-lg overflow-y-auto max-h-[90vh]"
      >
        <DialogHeader>
          <DialogTitle className="text-dracula-foreground">
            Filter & Sort Projects
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-2">
          {/* Search Section */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-dracula-comment uppercase tracking-wider">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-dracula-comment" />
              <Input
                placeholder="Project name..."
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

          {/* Status Section */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-dracula-comment uppercase tracking-wider">
              Status
            </label>
            <div className="flex flex-wrap gap-2">
              {(["All", ...Object.values(ProjectState)] as const).map(
                (status) => (
                  <button
                    key={status}
                    onClick={() => updateState(status)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-sm font-medium border transition-all",
                      internalState.state === status
                        ? "bg-dracula-purple/20 border-dracula-purple text-dracula-purple"
                        : "bg-dracula-current-line/40 border-dracula-selection text-dracula-comment hover:bg-dracula-current-line"
                    )}
                  >
                    {status}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="h-px bg-dracula-selection/50 my-2" />

          {/* Sorting Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-dracula-comment uppercase tracking-wider">
                Sort By
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => updateSortBy("created_at")}
                  className={cn(
                    "flex items-center justify-center gap-2 p-2 rounded-lg border transition-all text-sm font-medium",
                    internalState.sortBy === "created_at"
                      ? "bg-dracula-orange/20 border-dracula-orange text-dracula-orange"
                      : "bg-dracula-current-line/40 border-dracula-selection text-dracula-comment hover:bg-dracula-current-line"
                  )}
                >
                  <Calendar className="w-4 h-4" />
                  Created Date
                </button>
                <button
                  onClick={() => updateSortBy("deadline")}
                  className={cn(
                    "flex items-center justify-center gap-2 p-2 rounded-lg border transition-all text-sm font-medium",
                    internalState.sortBy === "deadline"
                      ? "bg-dracula-orange/20 border-dracula-orange text-dracula-orange"
                      : "bg-dracula-current-line/40 border-dracula-selection text-dracula-comment hover:bg-dracula-current-line"
                  )}
                >
                  <Clock className="w-4 h-4" />
                  Deadline
                </button>
                <button
                  onClick={() => updateSortBy("state")}
                  className={cn(
                    "flex items-center justify-center gap-2 p-2 rounded-lg border transition-all text-sm font-medium",
                    internalState.sortBy === "state"
                      ? "bg-dracula-orange/20 border-dracula-orange text-dracula-orange"
                      : "bg-dracula-current-line/40 border-dracula-selection text-dracula-comment hover:bg-dracula-current-line"
                  )}
                >
                  <ListOrdered className="w-4 h-4" />
                  Status
                </button>
                <button
                  onClick={() => updateSortBy("updated_at")}
                  className={cn(
                    "flex items-center justify-center gap-2 p-2 rounded-lg border transition-all text-sm font-medium",
                    internalState.sortBy === "updated_at"
                      ? "bg-dracula-orange/20 border-dracula-orange text-dracula-orange"
                      : "bg-dracula-current-line/40 border-dracula-selection text-dracula-comment hover:bg-dracula-current-line"
                  )}
                >
                  <Calendar className="w-4 h-4" />
                  Updated
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-dracula-comment uppercase tracking-wider">
                Direction
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => updateSortDir("asc")}
                  className={cn(
                    "flex items-center justify-center gap-2 p-2 rounded-lg border transition-all text-sm font-medium",
                    internalState.sortDir === "asc"
                      ? "bg-dracula-cyan/20 border-dracula-cyan text-dracula-cyan"
                      : "bg-dracula-current-line/40 border-dracula-selection text-dracula-comment hover:bg-dracula-current-line"
                  )}
                >
                  <ArrowDownAZ className="w-4 h-4" />
                  Ascending
                </button>
                <button
                  onClick={() => updateSortDir("desc")}
                  className={cn(
                    "flex items-center justify-center gap-2 p-2 rounded-lg border transition-all text-sm font-medium",
                    internalState.sortDir === "desc"
                      ? "bg-dracula-cyan/20 border-dracula-cyan text-dracula-cyan"
                      : "bg-dracula-current-line/40 border-dracula-selection text-dracula-comment hover:bg-dracula-current-line"
                  )}
                >
                  <ArrowUpZA className="w-4 h-4" />
                  Descending
                </button>
              </div>
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
