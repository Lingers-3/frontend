import { toast } from "sonner";
import { z } from "zod";
import { useAppForm } from "~/hooks/use-app-form";
import type { ProjectFormProps } from "../pages/forms/ProjectFrom";
import { useCreateProject, useUpdateProject } from "./projects-hooks";

const projectSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(256, "Name must be less than 256 characters"),
  description: z
    .string()
    .max(512, "Description must be less than 512 characters")
    .optional()
    .nullable(),
});

export function useProjectForm({
  mode,
  projectId,
  initialData,
  onClose,
}: ProjectFormProps) {
  const { mutate: createProject, isPending: isCreating } = useCreateProject();
  const { mutate: updateProject, isPending: isUpdating } = useUpdateProject();

  const isPending = isCreating || isUpdating;

  const form = useAppForm({
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
    },
    validators: {
      onBlur: ({ value }) => {
        const errors: { fields: Record<string, string> } = { fields: {} };
        const result = projectSchema.safeParse(value);
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
        const payload = {
          name: value.name,
          description: value.description || undefined,
        };

        if (mode === "create") {
          createProject(payload, {
            onSuccess: () => {
              toast.success("Project created");
              onClose();
            },
            onError: () => toast.error("Failed to create project"),
          });
        } else if (mode === "update" && projectId) {
          updateProject(
            { id: projectId, payload },
            {
              onSuccess: () => {
                toast.success("Project updated");
                onClose();
              },
              onError: () => toast.error("Failed to update project"),
            }
          );
        }
      },
    },
  });

  return { form, createProject, updateProject, isPending };
}
