import { CalendarClock, Target } from "lucide-react";
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
import ProjectMetricsForm from "./ProjectMetricsForm";
import type { MetricsType } from "../../hooks/use-project-metrics-form";
import type { ProjectFull } from "../../services/project/types";

interface ProjectMetricsDialogProps {
  project: ProjectFull;
  metricsType: MetricsType;
  trigger: React.ReactNode;
}

export default function ProjectMetricsDialog({
  project,
  metricsType,
  trigger,
}: ProjectMetricsDialogProps) {
  const [open, setOpen] = useState(false);

  const isPlan = metricsType === "plan";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogOverlay className="fixed inset-0 bg-black/10 backdrop-blur-sm" />
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="rounded-2xl bg-dracula-background border-dracula-selection max-w-lg"
      >
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-dracula-current-line rounded-full">
              {isPlan ? (
                <Target className="h-6 w-6 text-dracula-cyan" />
              ) : (
                <CalendarClock className="h-6 w-6 text-dracula-orange" />
              )}
            </div>
            <div>
              <DialogTitle className="text-dracula-foreground text-xl">
                {isPlan ? "Edit project plan" : "Update actual metrics"}
              </DialogTitle>
              <DialogDescription className="text-dracula-comment">
                {isPlan
                  ? "Define the targets for time, income, and deadlines."
                  : "Log the real-world progress and results."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <ProjectMetricsForm
          projectId={project.id}
          project={project}
          metricsType={metricsType}
          onClose={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
