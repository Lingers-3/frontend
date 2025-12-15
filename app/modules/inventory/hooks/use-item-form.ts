import { toast } from "sonner";
import { z } from "zod";
import { useCreateItem, useUpdateItem } from "~/modules/inventory/hooks/inventory-hooks";
import { useAppForm } from "~/modules/inventory/hooks/use-app-form";
import type { ItemFormProps } from "~/modules/inventory/pages/items/ItemForm";

const itemSchema = z.object({
  item_type_id: z.coerce.number().min(1, "Item type ID is required"),
  description: z.string().optional().nullable(),
  quantity: z.coerce
    .number("Must be a number")
    .nonnegative("Must not be negative"),
  display_measurement_unit: z.string().optional().nullable(),
  purchase_price: z.coerce
    .number("Must be a number")
    .nonnegative("Must not be negative")
    .optional()
    .nullable(),
  expiration_date: z.string().optional().nullable(),
});

export function useItemForm({
  mode,
  itemId,
  initialData,
  defaultItemTypeId,
  onClose,
}: ItemFormProps) {
  const { mutate: createItem, isPending: isCreating } = useCreateItem();
  const { mutate: updateItem, isPending: isUpdating } = useUpdateItem();

  const isPending = isCreating || isUpdating;

  const form = useAppForm({
    defaultValues: {
      item_type_id: defaultItemTypeId?.toString() || "",
      description: initialData?.description || "",
      quantity: initialData?.quantity?.toString() || "0",
      display_measurement_unit: initialData?.display_measurement_unit || "",
      purchase_price: initialData?.purchase_price?.toString() || "",
      expiration_date: initialData?.expiration_date
        ? new Date(initialData.expiration_date).toISOString().split("T")[0]
        : "",
    },
    validators: {
      onBlur: ({ value }) => {
        const errors: { fields: Record<string, string> } = { fields: {} };
        const result = itemSchema.safeParse(value);
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
        const commonPayload = {
          description: value.description || null,
          quantity: Number(value.quantity),
          display_measurement_unit: value.display_measurement_unit || undefined,
          purchase_price: value.purchase_price
            ? Number(value.purchase_price)
            : null,
          expiration_date: value.expiration_date
            ? new Date(value.expiration_date).toISOString()
            : null,
        };

        if (mode === "create") {
          createItem(
            {
              ...commonPayload,
              item_type_id: Number(value.item_type_id),
              tag_ids: [],
            },
            {
              onSuccess: () => {
                toast.success("Item created");
                onClose();
              },
              onError: () => toast.error("Failed to create item"),
            }
          );
        } else if (mode === "update" && itemId) {
          updateItem(
            {
              id: itemId,
              payload: commonPayload,
            },
            {
              onSuccess: () => {
                toast.success("Item updated");
                onClose();
              },
              onError: () => toast.error("Failed to update item"),
            }
          );
        }
      },
    },
  });

  return { form, isPending };
}
