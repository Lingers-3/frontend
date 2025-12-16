import { toast } from "sonner";
import { z } from "zod";
import { useAppForm } from "~/hooks/use-app-form";
import {
  useUpdateProjectPlan,
  useUpdateProjectActualMetrics,
} from "./projects-hooks";
import type { ProjectMetricsFormProps } from "../pages/forms/ProjectMetricsForm";

export type MetricsType = "plan" | "actual";

const NS_PER_HOUR = 3600 * 1000 * 1000 * 1000;

const metricsSchema = z.object({
  deadline: z.string().optional().nullable(),
  income: z.coerce.number().min(0, "Income cannot be negative").optional(),
  work_time: z.coerce
    .number()
    .min(0, "Work time cannot be negative")
    .optional(),
});

export function useProjectMetricsForm({
  projectId,
  project,
  metricsType,
  onClose,
}: ProjectMetricsFormProps) {
  const { mutate: updatePlan, isPending: isUpdatingPlan } =
    useUpdateProjectPlan();
  const { mutate: updateActual, isPending: isUpdatingActual } =
    useUpdateProjectActualMetrics();

  const isPending = isUpdatingPlan || isUpdatingActual;

  const initialValues =
    metricsType === "plan"
      ? {
          deadline: project.planned_deadline || "",
          income: project.planned_income?.toString() || "",
          work_time: project.planned_work_time
            ? (project.planned_work_time / NS_PER_HOUR).toString()
            : "",
        }
      : {
          deadline: project.actual_deadline || "",
          income: project.actual_income?.toString() || "",
          work_time: project.actual_work_time
            ? (project.actual_work_time / NS_PER_HOUR).toString()
            : "",
        };

  const form = useAppForm({
    defaultValues: initialValues,
    validators: {
      onBlur: ({ value }) => {
        const errors: { fields: Record<string, string> } = { fields: {} };
        const result = metricsSchema.safeParse(value);
        if (!result.success) {
          for (const issue of result.error.issues) {
            const field = issue.path[0] as string;
            if (!errors.fields[field]) {
              errors.fields[field] = issue.message;
            }
          }
        }
        return errors;
      },
      onSubmit: async ({ value }) => {
        let formattedDeadline = undefined;

        if (value.deadline) {
          formattedDeadline = new Date(value.deadline).toISOString();
        }

        const hoursInput = value.work_time ? Number(value.work_time) : 0;
        const workTimeInNs = hoursInput * NS_PER_HOUR;

        const commonData = {
          deadline: formattedDeadline,
          income: value.income ? Number(value.income) : 0,
          work_time: workTimeInNs, 
        };

        if (metricsType === "plan") {
          updatePlan(
            {
              id: projectId,
              payload: {
                planned_deadline: commonData.deadline,
                planned_income: commonData.income,
                planned_work_time: commonData.work_time,
              },
            },
            {
              onSuccess: () => {
                toast.success("Project plan updated");
                onClose();
              },
              onError: () => toast.error("Failed to update project plan"),
            }
          );
        } else {
          updateActual(
            {
              id: projectId,
              payload: {
                actual_deadline: commonData.deadline,
                actual_income: commonData.income,
                actual_work_time: commonData.work_time,
              },
            },
            {
              onSuccess: () => {
                toast.success("Actual metrics updated");
                onClose();
              },
              onError: () => toast.error("Failed to update actual metrics"),
            }
          );
        }
      },
    },
  });

  return { form, isPending };
}
