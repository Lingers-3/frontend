import { Play, CheckCircle2, Ban } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  useStartProject,
  useCompleteProject,
  useCancelProject,
} from "../../hooks/projects-hooks";
import { ProjectState, type ProjectFull } from "../../services/types";

export const ProjectActionsCard = ({ project }: { project: ProjectFull }) => {
  const { mutate: startProject, isPending: isStarting } = useStartProject();
  const { mutate: completeProject, isPending: isCompleting } =
    useCompleteProject();
  const { mutate: cancelProject, isPending: isCanceling } = useCancelProject();

  if (
    project.state === ProjectState.Completed ||
    project.state === ProjectState.Canceled
  ) {
    return null;
  }

  return (
    <div className="bg-dracula-current-line/20 border border-dracula-selection rounded-2xl p-5 shadow-sm">
      <h3 className="text-xs font-bold text-dracula-comment uppercase mb-3">
        Actions
      </h3>
      <div className="flex flex-col gap-2">
        {project.state === ProjectState.Planning && (
          <Button
            onClick={() => startProject(project.id)}
            disabled={isStarting}
            className="w-full justify-start gap-3 bg-dracula-purple hover:bg-dracula-purple/90 text-dracula-background font-bold h-12 rounded-xl"
          >
            <div className="bg-white/20 p-1.5 rounded-full">
              <Play className="w-4 h-4 fill-current" />
            </div>
            Start Project
          </Button>
        )}

        {project.state === ProjectState.Active && (
          <>
            <Button
              onClick={() => completeProject({ id: project.id, payload: {} })}
              disabled={isCompleting}
              className="w-full justify-start gap-3 bg-dracula-green hover:bg-dracula-green/90 text-dracula-background font-bold h-12 rounded-xl"
            >
              <div className="bg-white/20 p-1.5 rounded-full">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              Complete Project
            </Button>

            <Button
              onClick={() => {
                if (
                  confirm(
                    "Are you sure you want to cancel this project? Inventory items will be returned."
                  )
                ) {
                  cancelProject({
                    id: project.id,
                    payload: { return_items_to_inventory: true },
                  });
                }
              }}
              disabled={isCanceling}
              variant="outline"
              className="w-full justify-start gap-3 border-dracula-red/30 text-dracula-red hover:bg-dracula-red/10 h-12 rounded-xl"
            >
              <div className="bg-dracula-red/10 p-1.5 rounded-full">
                <Ban className="w-4 h-4" />
              </div>
              Cancel Project
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
