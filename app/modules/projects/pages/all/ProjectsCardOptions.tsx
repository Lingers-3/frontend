import { MoreVertical, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { useDeleteProject, useProject } from "../../hooks/projects-hooks";
import ProjectDialog from "../forms/ProjectDialog";

interface ProjectCardOptionsProps {
  projectId: number;
}

export function ProjectCardOptions({ projectId }: ProjectCardOptionsProps) {
  const { mutate: deleteProject } = useDeleteProject();
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setOpen((prev) => !prev);
          }}
          className="p-2 hover:bg-dracula-current-line rounded-md text-dracula-comment hover:text-dracula-foreground transition-colors"
          aria-label="More options"
        >
          <MoreVertical className="w-5 h-5" />
        </button>
      </PopoverTrigger>

      <PopoverContent
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        align="end"
        className="w-48 p-1 bg-dracula-background border border-dracula-selection rounded-lg shadow-lg"
      >
        <ProjectEditTrigger projectId={projectId} />

        <div className="h-px bg-dracula-selection my-1"></div>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (
              confirm(
                "Are you sure you want to delete this project? This action cannot be undone."
              )
            ) {
              deleteProject(projectId);
              toast.info("Project deleted");
              setOpen(false);
            }
          }}
          className="w-full text-left px-4 py-2 text-sm text-dracula-red hover:bg-dracula-current-line flex items-center gap-2 rounded-md"
        >
          <Trash2 className="w-4 h-4" /> Delete
        </button>
      </PopoverContent>
    </Popover>
  );
}

function ProjectEditTrigger({ projectId }: { projectId: number }) {
  const { data: project, isLoading } = useProject(projectId);

  if (isLoading || !project) {
    return (
      <div className="px-4 py-2 text-sm text-dracula-comment italic">
        Loading...
      </div>
    );
  }

  return (
    <ProjectDialog
      mode="update"
      project={project}
      trigger={
        <button className="w-full text-left px-4 py-2 text-sm text-dracula-foreground hover:bg-dracula-current-line flex items-center gap-2 rounded-md">
          <Edit className="w-4 h-4 text-dracula-cyan" /> Edit
        </button>
      }
    />
  );
}