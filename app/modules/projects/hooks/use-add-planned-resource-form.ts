import { toast } from "sonner";
import { z } from "zod";
import { useAppForm } from "~/hooks/use-app-form";
import { ResourceType } from "../services/project/types";
import { useAddPlannedResource } from "./projects-hooks";

const plannedResourceSchema = z.object({
  resource_type: z.enum(ResourceType),
  planned_quantity: z.coerce
    .number()
    .positive("Quantity must be greater than 0"),
});

export interface AddPlannedResourceFormProps {
  projectId: number;
  selectedItemTypeId: number; 
  onSuccess: () => void; 
}

export function useAddPlannedResourceForm({
  projectId,
  selectedItemTypeId,
  onSuccess,
}: AddPlannedResourceFormProps) {
  const { mutate: addResource, isPending } = useAddPlannedResource();

  const form = useAppForm({
    defaultValues: {
      resource_type: ResourceType.Consumable,
      planned_quantity: "",
    },
    validators: {
      onBlur: ({ value }) => {
        const errors: { fields: Record<string, string> } = { fields: {} };
        const result = plannedResourceSchema.safeParse(value);
        if (!result.success) {
          for (const issue of result.error.issues) {
            const field = issue.path[0] as string;
            if (!errors.fields[field]) errors.fields[field] = issue.message;
          }
        }
        return errors;
      },
      onSubmit: async ({ value }) => {
        addResource(
          {
            id: projectId,
            payload: {
              item_type_id: selectedItemTypeId, 
              resource_type: value.resource_type as ResourceType,
              planned_quantity: Number(value.planned_quantity),
            },
          },
          {
            onSuccess: () => {
              toast.success("Resource added");
              onSuccess();
            },
            onError: () => toast.error("Failed to add resource"),
          }
        );
      },
    },
  });

  return { form, isPending };
}
