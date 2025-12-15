import { Plus, Package } from "lucide-react";
import { Button } from "~/components/ui/button";
import type { ProjectFull } from "../../services/types";

export const ProjectResourcesPanel = ({
  project,
}: {
  project: ProjectFull;
}) => {
  return (
    <div className="bg-dracula-current-line/20 border border-dracula-selection rounded-2xl p-5 shadow-sm h-full min-h-[400px] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-dracula-current-line rounded-lg">
            <Package className="w-5 h-5 text-dracula-orange" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-dracula-foreground">
              Resources
            </h2>
            <p className="text-xs text-dracula-comment">Materials & Tools</p>
          </div>
        </div>

        <Button
          size="sm"
          className="bg-dracula-purple hover:bg-dracula-purple/90 text-dracula-background font-bold gap-2 rounded-lg"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add</span>
        </Button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-dracula-selection/50 rounded-xl bg-dracula-background/30 p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-dracula-current-line flex items-center justify-center mb-4">
          <Package className="w-6 h-6 text-dracula-comment" />
        </div>
        <h3 className="text-dracula-foreground font-medium mb-2">
          No resources allocated
        </h3>
        <p className="text-dracula-comment text-sm max-w-[250px] mb-6">
          Add the materials and tools required for this project to track usage
          and costs.
        </p>
        <Button
          variant="outline"
          className="border-dracula-purple text-dracula-purple hover:bg-dracula-purple/10"
        >
          Add your first resource
        </Button>
      </div>
    </div>
  );
};
