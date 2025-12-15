import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { Button } from "~/components/ui/button";
import { useProject } from "../../hooks/projects-hooks";
import { ProjectState } from "../../services/types";
import { ProjectActionsCard } from "./ProjectActionsCard";
import { ProjectInfoCard } from "./ProjectInfoCard";
import { ProjectMetricsCard } from "./ProjectMetricsCard";
import { ProjectResourcesPanel } from "./ProjectResourcesPanel";

export const formatDate = (dateStr?: string) => {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const formatDateTime = (dateStr?: string) => {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getStatusColor = (state: ProjectState) => {
  switch (state) {
    case ProjectState.Planning:
      return "border-dracula-comment text-dracula-comment";
    case ProjectState.Active:
      return "border-dracula-cyan text-dracula-cyan";
    case ProjectState.Completed:
      return "border-dracula-green text-dracula-green";
    case ProjectState.Canceled:
      return "border-dracula-red text-dracula-red";
    default:
      return "border-dracula-foreground text-dracula-foreground";
  }
};

export default function ProjectPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const id = Number(projectId);

  const { data: project, isLoading, isError } = useProject(id);

  if (isLoading) {
    return (
      <div className="min-h-screen p-4 sm:p-6 space-y-6">
        <div className="h-8 bg-dracula-current-line/50 rounded w-1/4 animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="h-[500px] bg-dracula-current-line/20 rounded-2xl animate-pulse" />
          <div className="h-[500px] bg-dracula-current-line/20 rounded-2xl animate-pulse lg:col-span-2" />
        </div>
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-dracula-red gap-4">
        <p className="text-xl font-bold">Project not found</p>
        <Button onClick={() => navigate("..")} variant="outline">
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dracula-background text-dracula-foreground p-4 sm:p-0">
      <div className="mb-6">
        <Button
          variant="link"
          onClick={() => navigate("..")}
          className="pl-0 ml-0 text-lg text-dracula-comment hover:text-dracula-purple gap-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 flex flex-col gap-6">
          <ProjectInfoCard project={project} />
          <ProjectMetricsCard project={project} />
          <ProjectActionsCard project={project} />
        </div>

        <div className="lg:col-span-2">
          <ProjectResourcesPanel project={project} />
        </div>
      </div>
    </div>
  );
}
