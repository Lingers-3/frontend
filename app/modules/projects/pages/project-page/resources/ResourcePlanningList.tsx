import { Package, Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import { type ProjectFull } from "../../../services/project/types";
import AddPlannedResourceDialog from "../../forms/AddPlannedResourceDialog";
import { ResourceCard } from "./ResourceCard";

export const ResourcePlanningList = ({ project }: { project: ProjectFull }) => {
  return (
    <>
      {project.specifications.length === 0 ? (
        <div className="h-full flex-1 flex flex-col items-center justify-center border-2 border-dashed border-dracula-selection/50 rounded-xl bg-dracula-background/30 p-8 text-center min-h-[200px]">
          <Package className="w-10 h-10 text-dracula-comment mb-3" />
          <p className="text-dracula-comment text-sm mb-4">
            No resources planned yet.
          </p>
          <AddPlannedResourceDialog
            projectId={project.id}
            trigger={
              <Button
                variant="outline"
                className="border-dracula-purple text-dracula-purple hover:bg-dracula-purple/10"
              >
                Add Resource Plan
              </Button>
            }
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {project.specifications.map((spec) => (
            <ResourceCard
              key={spec.id}
              spec={spec}
              mode="planning"
              projectId={project.id}
            />
          ))}
          <div className="mt-4 flex justify-center">
            <AddPlannedResourceDialog
              projectId={project.id}
              trigger={
                <Button
                  variant="ghost"
                  className="text-dracula-purple hover:bg-dracula-purple/10 gap-2"
                >
                  <Plus className="w-4 h-4" /> Add another resource
                </Button>
              }
            />
          </div>
        </div>
      )}
    </>
  );
};
