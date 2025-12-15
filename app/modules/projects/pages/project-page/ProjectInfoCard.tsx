import { Edit2, Clock } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import type { ProjectFull } from "../../services/types";
import ProjectDialog from "../forms/ProjectDialog";
import { formatDateTime, getStatusColor } from ".";

export const ProjectInfoCard = ({ project }: { project: ProjectFull }) => {
  const startTime = project.started_at
    ? formatDateTime(project.started_at)
    : null;

  return (
    <div className="bg-dracula-current-line/20 border border-dracula-selection rounded-2xl p-5 shadow-sm">
      <div className="flex flex-col justify-between items-start mb-4">
        <div className="flex w-full items-start justify-between">
          <Badge
            variant="outline"
            className={cn(
              "uppercase tracking-wider h-9",
              getStatusColor(project.state)
            )}
          >
            {project.state}
          </Badge>
          <ProjectDialog
            mode="update"
            project={project}
            trigger={
              <Button
                variant="outline"
                className="border-dracula-purple text-dracula-purple hover:bg-dracula-purple/10"
                size="icon"
              >
                <Edit2 className="w-5 h-5" />
              </Button>
            }
          />
        </div>
        <h1 className="text-2xl font-bold text-dracula-foreground leading-tight mt-4">
          {project.name}
        </h1>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-xs font-bold text-dracula-comment uppercase mb-1">
            Description
          </h3>
          <p className="text-dracula-foreground/90 text-sm whitespace-pre-wrap leading-relaxed">
            {project.description || (
              <span className="text-dracula-comment italic">
                No description provided.
              </span>
            )}
          </p>
        </div>

        {startTime && (
          <div className="flex items-center gap-2 text-xs text-dracula-comment bg-dracula-current-line/40 px-3 py-2 rounded-lg w-fit">
            <Clock className="w-3.5 h-3.5" />
            <span>Started: {startTime}</span>
          </div>
        )}
      </div>
    </div>
  );
};
