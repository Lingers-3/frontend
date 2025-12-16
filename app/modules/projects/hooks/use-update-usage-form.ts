import { toast } from "sonner";
import { z } from "zod";
import { useAppForm } from "~/hooks/use-app-form";
import { useUpdateResourceUsage } from "./projects-hooks";

const usageSchema = z.object({
  used_quantity: z.coerce
    .number()
    .nonnegative("Used quantity cannot be negative"),
});

export interface UpdateUsageFormProps {
  projectId: number;
  reservationId: number;
  currentUsed: number;
  maxReserved: number;
  onClose: () => void;
}

export function useUpdateUsageForm({
  projectId,
  reservationId,
  currentUsed,
  maxReserved,
  onClose,
}: UpdateUsageFormProps) {
  const { mutate: updateUsage, isPending } = useUpdateResourceUsage();

  const form = useAppForm({
    defaultValues: {
      used_quantity: currentUsed.toString(),
    },
    validators: {
      onBlur: ({ value }) => {
        const errors: { fields: Record<string, string> } = { fields: {} };
        const result = usageSchema.safeParse(value);

        if (!result.success) {
          for (const issue of result.error.issues) {
            const field = issue.path[0] as string;
            if (!errors.fields[field]) errors.fields[field] = issue.message;
          }
        } else {
          if (Number(value.used_quantity) > maxReserved) {
            errors.fields.used_quantity = `Cannot use more than reserved (${maxReserved})`;
          }
        }
        return errors;
      },
      onSubmit: async ({ value }) => {
        updateUsage(
          {
            id: projectId,
            resId: reservationId,
            payload: {
              used_quantity: Number(value.used_quantity),
            },
          },
          {
            onSuccess: () => {
              toast.success("Usage updated");
              onClose();
            },
            onError: () => toast.error("Failed to update usage"),
          }
        );
      },
    },
  });

  return { form, isPending };
}
