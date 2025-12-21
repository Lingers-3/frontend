import { Edit2, Calendar, Clock, Banknote } from "lucide-react";
import { cn } from "~/lib/utils";
import { ProjectState, type ProjectFull } from "../../services/project/types";
import ProjectMetricsDialog from "../forms/ProjectMetricsDialog";
import { formatDate } from ".";

export const ProjectMetricsCard = ({ project }: { project: ProjectFull }) => {
  const isPlanning = project.state === ProjectState.Planning;

  const MetricItem = ({
    icon: Icon,
    label,
    value,
    colorClass = "text-dracula-foreground",
  }: {
    icon: any;
    label: string;
    value: React.ReactNode;
    colorClass?: string;
  }) => (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1.5 text-dracula-comment">
        <Icon className="w-3.5 h-3.5" />
        <span className="text-[10px] uppercase font-bold tracking-wider">
          {label}
        </span>
      </div>
      <p className={cn("text-sm font-mono font-medium pl-5", colorClass)}>
        {value}
      </p>
    </div>
  );

  return (
    <div className="bg-dracula-current-line/20 border border-dracula-selection rounded-2xl p-5 shadow-sm">
      <div className="grid grid-cols-2 gap-6 relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-dracula-selection/50 -translate-x-1/2 hidden sm:block" />

        <div className="space-y-4">
          <div className="flex justify-between items-center h-6">
            <h3 className="text-xs font-bold text-dracula-comment uppercase">
              Planned
            </h3>
            {isPlanning && (
              <ProjectMetricsDialog
                project={project}
                metricsType="plan"
                trigger={
                  <button className="cursor-pointer border-dracula-selection border-[1px] text-dracula-comment hover:text-dracula-purple transition-colors p-2 rounded-md hover:bg-dracula-current-line">
                    <Edit2 className="w-3 h-3" />
                  </button>
                }
              />
            )}
          </div>

          <div className="space-y-3">
            <MetricItem
              icon={Calendar}
              label="Deadline"
              value={formatDate(project.planned_deadline)}
            />
            <MetricItem
              icon={Banknote}
              label="Income"
              value={`${project.planned_income || 0} UAH`}
            />
            <MetricItem
              icon={Clock}
              label="Time"
              value={`${project.planned_work_time / (3600 * 1000 * 1000 * 1000) || 0} h`}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center h-6">
            <h3 className="text-xs font-bold text-dracula-cyan uppercase">
              Actual
            </h3>
            {!isPlanning && (
              <ProjectMetricsDialog
                project={project}
                metricsType="actual"
                trigger={
                  <button className="cursor-pointer border-dracula-selection border-[1px] text-dracula-comment hover:text-dracula-purple transition-colors p-2 rounded-md hover:bg-dracula-current-line">
                    <Edit2 className="w-3 h-3" />
                  </button>
                }
              />
            )}
          </div>

          <div className="space-y-3">
            <MetricItem
              icon={Calendar}
              label="Finished"
              value={formatDate(project.actual_deadline)}
              colorClass={
                project.actual_deadline
                  ? "text-dracula-foreground"
                  : "text-dracula-comment"
              }
            />
            <MetricItem
              icon={Banknote}
              label="Income"
              value={`${project.actual_income || 0} UAH`}
              colorClass="text-dracula-green"
            />
            <MetricItem
              icon={Clock}
              label="Time"
              value={`${project.actual_work_time / (3600 * 1000 * 1000 * 1000) || 0} h`}
              colorClass="text-dracula-red"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
