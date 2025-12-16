import { FolderPlus, Edit } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogOverlay,
} from "~/components/ui/dialog";
import type { ProjectFull } from "../../services/project/types";
import ProjectForm from "./ProjectFrom";

type ProjectDialogProps =
  | { mode: "create"; project?: never; trigger: React.ReactNode }
  | { mode: "update"; project: ProjectFull; trigger: React.ReactNode };

export default function ProjectDialog({
  mode,
  project: projectData,
  trigger,
}: ProjectDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>{" "}
      {mode === "create" && (
        <DialogOverlay className="fixed inset-0 bg-black/10 backdrop-blur-sm" />
      )}
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="rounded-2xl bg-dracula-background border-dracula-selection max-w-lg"
      >
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-dracula-current-line rounded-full">
              {mode === "create" ? (
                <FolderPlus className="h-6 w-6 text-dracula-purple" />
              ) : (
                <Edit className="h-6 w-6 text-dracula-cyan" />
              )}
            </div>
            <div>
              <DialogTitle className="text-dracula-foreground text-xl">
                {mode === "create" ? "Create project" : "Edit project"}
              </DialogTitle>
              <DialogDescription className="text-dracula-comment">
                {mode === "create"
                  ? "Start planning a new project."
                  : "Update the details of this project."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <ProjectForm
          mode={mode}
          projectId={projectData?.id}
          initialData={mode === "update" ? projectData : undefined}
          onClose={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
