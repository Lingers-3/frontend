import { toast } from "sonner";
import { z } from "zod";
import { useCreateTag, useUpdateTag } from "./inventory-hooks";
import { useAppForm } from "./use-app-form";
import type { TagFormProps } from "~/pages/inventory/tags/TagForm";

const tagSchema = z.object({
  name: z.string().min(1, "Name is required"),
  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Invalid RGB hex color")
    .optional()
    .nullable(),
});

export function useTagForm({
  mode,
  tagId,
  initialData,
  onClose,
  targetId,
  targetType,
}: TagFormProps) {
  const { mutate: createTag, isPending: isCreating } = useCreateTag();
  const { mutate: updateTag, isPending: isUpdating } = useUpdateTag();

  const isPending = isCreating || isUpdating;

  const form = useAppForm({
    defaultValues: {
      name: initialData?.name || "",
      color: initialData?.color
        ? `#${initialData.color.replace("#", "")}`
        : "#ffffff",
    },
    validators: {
      onBlur: ({ value }) => {
        const errors: { fields: Record<string, string> } = { fields: {} };
        const result = tagSchema.safeParse(value);
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
        const cleanColor = value.color
          ? value.color.replace("#", "")
          : undefined;

        const payload = {
          name: value.name,
          color: cleanColor,
        };

        if (mode === "create") {
          createTag(
            {
              ...payload,
              target_id: targetId,
              target_type: targetType,
            },
            {
              onSuccess: () => {
                toast.success("Tag created");
                onClose();
              },
              onError: (error) =>
                toast.error("Failed to create tag: " + error.message),
            }
          );
        } else if (mode === "update" && tagId) {
          updateTag(
            { id: tagId, payload },
            {
              onSuccess: () => {
                toast.success("Tag updated");
                onClose();
              },
              onError: () => toast.error("Failed to update tag"),
            }
          );
        }
      },
    },
  });

  return { form, createTag, updateTag, isPending };
}
