import { Filter, Search, X } from "lucide-react";
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
import { ProjectState } from "../../services/types";

export interface ProjectFilterState {
  search: string;
  state: ProjectState | "All";
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

  const applyFilters = () => {
    onChange(internalState);
    setOpen(false);
  };

  const resetFilters = () => {
    const emptyState: ProjectFilterState = { search: "", state: "All" };
    setInternalState(emptyState);
    onChange(emptyState);
    setOpen(false);
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

            {state.search === "" && state.state === "All" ? (
              <span className="text-dracula-comment text-sm">
                Search or filter by status...
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
        className="rounded-2xl bg-dracula-background border-dracula-selection max-w-lg"
      >
        <DialogHeader>
          <DialogTitle className="text-dracula-foreground">
            Filter Projects
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
