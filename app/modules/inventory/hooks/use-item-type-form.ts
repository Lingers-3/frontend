import { toast } from "sonner";
import { z } from "zod";
import { useCreateItemType, useUpdateItemType } from "./inventory-hooks";
import type { ItemTypeFormProps } from "~/modules/inventory/pages/item-types/ItemTypeForm";
import { useAppForm } from "~/hooks/use-app-form";

const itemTypeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional().nullable(),
  base_measurement_unit: z.string().min(1, "Base unit is required"),
  display_measurement_unit: z.string().optional().nullable(),
  default_quantity: z.coerce
    .number("Must be a number")
    .nonnegative("Must not be negative"),
  shortage_threshold: z.coerce
    .number("Must be a number")
    .nonnegative("Must not be negative"),
});

export function useItemTypeForm({
  mode,
  itemTypeId,
  initialData,
  onClose,
}: ItemTypeFormProps) {
  const { mutate: createItemType, isPending: isCreating } = useCreateItemType();
  const { mutate: updateItemType, isPending: isUpdating } = useUpdateItemType();

  const isPending = isCreating || isUpdating;

  const form = useAppForm({
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      base_measurement_unit: initialData?.base_measurement_unit || "",
      display_measurement_unit: initialData?.display_measurement_unit || "",
      default_quantity: initialData?.default_quantity?.toString() || "",
      shortage_threshold: initialData?.shortage_threshold?.toString() || "",
    },
    validators: {
      onBlur: ({ value }) => {
        const errors: { fields: Record<string, string> } = { fields: {} };
        const result = itemTypeSchema.safeParse(value);
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
          description: value.description || null,
          base_measurement_unit: value.base_measurement_unit,
          display_measurement_unit: value.base_measurement_unit, // Using base unit as display unit for now
          default_quantity: value.default_quantity
            ? Number(value.default_quantity)
            : null,
          shortage_threshold: value.shortage_threshold
            ? Number(value.shortage_threshold)
            : null,
        };

        if (mode === "create") {
          createItemType(
            { ...payload, tag_ids: [] },
            {
              onSuccess: () => {
                toast.success("Item type created");
                onClose();
              },
              onError: () => toast.error("Failed to create item type"),
            }
          );
        } else if (mode === "update" && itemTypeId) {
          updateItemType(
            { id: itemTypeId, payload },
            {
              onSuccess: () => {
                toast.success("Item type updated");
                onClose();
              },
              onError: () => toast.error("Failed to update item type"),
            }
          );
        }
      },
    },
  });

  return { form, createItemType, updateItemType, isPending };
}
