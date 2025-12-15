import { Calendar, Clock, Banknote } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { type Project, ProjectState } from "../../services/types";
import { ProjectCardOptions } from "./ProjectsCardOptions";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getStatusColor = (state: ProjectState) => {
    switch (state) {
      case ProjectState.Planning:
        return "text-dracula-comment border-dracula-comment";
      case ProjectState.Active:
        return "text-dracula-cyan border-dracula-cyan";
      case ProjectState.Completed:
        return "text-dracula-green border-dracula-green";
      case ProjectState.Canceled:
        return "text-dracula-red border-dracula-red";
      default:
        return "text-dracula-foreground border-dracula-foreground";
    }
  };

  const isPlanning = project.state === ProjectState.Planning;
  const isCanceled = project.state === ProjectState.Canceled;

  const income = isPlanning ? project.planned_income : project.actual_income;

  const time =
    (isPlanning ? project.planned_work_time : project.actual_work_time) /
    (3600 * 1000 * 1000 * 1000);

  const deadline = isPlanning
    ? project.planned_deadline
    : project.actual_deadline;
  const isOverdue =
    project.state === ProjectState.Active &&
    deadline &&
    new Date(deadline) < new Date();

  return (
    <div className="group relative flex flex-col bg-dracula-current-line rounded-3xl border border-dracula-selection shadow-sm hover:shadow-md hover:border-dracula-purple transition-all duration-200 overflow-hidden">
      <div className="p-5 flex flex-col flex-grow bg-dracula-background/50">
        <div className="flex justify-between items-start mb-3">
          <div className="flex flex-col gap-1 w-full mr-2">
            <Badge
              variant="outline"
              className={`w-fit text-[10px] px-2 py-0.5 uppercase tracking-wider font-bold mb-1 ${getStatusColor(project.state)}`}
            >
              {project.state}
            </Badge>

            <h3
              className="font-bold text-dracula-foreground text-lg leading-tight line-clamp-1"
              title={project.name}
            >
              {project.name}
            </h3>
            {project.description ? (
              <p className="text-xs text-dracula-comment line-clamp-1">
                {project.description}
              </p>
            ) : (
              <p className="text-xs text-dracula-comment italic">
                No description
              </p>
            )}
          </div>

          <ProjectCardOptions projectId={project.id} />
        </div>

        <div className="mt-auto space-y-3">
          <div className="h-px w-full bg-dracula-selection/50"></div>

          <div className="flex justify-between items-center text-sm">
            <div
              className="flex items-center gap-1.5 text-dracula-foreground/80"
              title="Work Time"
            >
              <Clock className="w-4 h-4 text-dracula-comment" />
              <span className="font-mono">{time ? `${time}h` : "-"}</span>
            </div>

            <div
              className="flex items-center gap-1.5 font-bold text-dracula-green"
              title="Income"
            >
              <span className="font-mono">
                {income ? `${income} UAH` : "-"}
              </span>
              <Banknote className="w-4 h-4" />
            </div>
          </div>

          <div
            className={`flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-xl bg-dracula-current-line/40 ${isOverdue ? "text-dracula-red bg-dracula-red/10" : "text-dracula-comment"}`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>
              {isCanceled
                ? "Canceled: "
                : project.state === ProjectState.Completed
                  ? "Finished: "
                  : "Deadline: "}
              {isCanceled && project.finished_at
                ? formatDate(project.finished_at)
                : project.state === ProjectState.Completed &&
                    project.finished_at
                  ? formatDate(project.finished_at)
                  : formatDate(deadline)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
