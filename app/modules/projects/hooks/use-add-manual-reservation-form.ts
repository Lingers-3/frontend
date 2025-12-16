import { toast } from "sonner";
import { z } from "zod";
import { useAppForm } from "~/hooks/use-app-form";
import { useAddReservation } from "./projects-hooks";

const manualResSchema = z.object({
  reserved_quantity: z.coerce.number().positive("Quantity must be positive"),
});

export interface AddManualReservationFormProps {
  projectId: number;
  specId: number;
  itemId: number;
  maxAvailable: number;
  onClose: () => void;
}

export function useAddManualReservationForm({
  projectId,
  specId,
  itemId,
  maxAvailable,
  onClose,
}: AddManualReservationFormProps) {
  const { mutate: addReservation, isPending } = useAddReservation();

  const form = useAppForm({
    defaultValues: {
      reserved_quantity: "",
    },
    validators: {
      onBlur: ({ value }) => {
        const errors: { fields: Record<string, string> } = { fields: {} };
        const result = manualResSchema.safeParse(value);
        if (!result.success) {
          for (const issue of result.error.issues) {
            errors.fields[issue.path[0] as string] = issue.message;
          }
        } else {
          if (Number(value.reserved_quantity) > maxAvailable) {
            errors.fields.reserved_quantity = `Only ${maxAvailable} available in stock`;
          }
        }
        return errors;
      },
      onSubmit: async ({ value }) => {
        addReservation(
          {
            id: projectId,
            specId: specId,
            payload: {
              item_id: itemId,
              reserved: Number(value.reserved_quantity),
            },
          },
          {
            onSuccess: () => {
              toast.success("Item reserved");
              onClose();
            },
            onError: () => toast.error("Failed to reserve item"),
          }
        );
      },
    },
  });

  return { form, isPending };
}
