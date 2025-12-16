import { Package, Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import { ProjectState, type ProjectFull } from "../../../services/project/types";
import AddPlannedResourceDialog from "../../forms/AddPlannedResourceDialog";
import { ResourcePlanningList } from "./ResourcePlanningList";
import { ResourceActiveList } from "./ResourceActiveList";

export const ProjectResourcesPanel = ({
  project,
}: {
  project: ProjectFull;
}) => {
  const isPlanning = project.state === ProjectState.Planning;

  return (
    <div className="bg-dracula-current-line/20 border border-dracula-selection rounded-2xl p-5 shadow-sm h-full flex flex-col">
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

        {isPlanning && (
          <AddPlannedResourceDialog
            projectId={project.id}
            trigger={
              <Button
                size="sm"
                className="bg-dracula-purple hover:bg-dracula-purple/90 text-dracula-background font-bold gap-2 rounded-lg"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add</span>
              </Button>
            }
          />
        )}
      </div>

      <div className="flex-1">
        {isPlanning ? (
          <ResourcePlanningList project={project} />
        ) : (
          <ResourceActiveList project={project} />
        )}
      </div>
    </div>
  );
};
