import { Button } from "~/components/ui/button";
import { AppFormField } from "~/components/form-components/AppFormField";
import { Select } from "~/components/form-components/Select";
import type { ItemTypeFull } from "~/modules/inventory/services/item-type/types";
import { useAddPlannedResourceForm } from "../../hooks/use-add-planned-resource-form";
import { ResourceType } from "../../services/project/types";

interface AddPlannedResourceFormProps {
  projectId: number;
  selectedItemType: ItemTypeFull;
  onClose: () => void;
  onBack: () => void;
}

export default function AddPlannedResourceForm({
  projectId,
  selectedItemType,
  onClose,
  onBack,
}: AddPlannedResourceFormProps) {
  const { form, isPending } = useAddPlannedResourceForm({
    projectId,
    selectedItemTypeId: selectedItemType.id,
    onSuccess: onClose,
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="mt-2"
    >
      <div className="flex items-center gap-3 p-3 bg-dracula-current-line/30 rounded-xl border border-dracula-selection mb-6">
        <div className="w-10 h-10 bg-dracula-background rounded-lg flex items-center justify-center text-xs font-bold text-dracula-comment border border-dracula-selection">
          {selectedItemType.picture_id ? "Img" : "No"}
        </div>
        <div>
          <p className="text-xs text-dracula-comment uppercase font-bold">
            Selected Resource
          </p>
          <p className="text-dracula-foreground font-medium">
            {selectedItemType.name}
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="ml-auto text-dracula-purple text-xs hover:text-dracula-purple/80"
        >
          Change
        </Button>
      </div>

      <div className="space-y-4">
        <form.AppField name="resource_type">
          {(_: any) => (
            <Select
              label="Usage Type"
              values={[
                {
                  label: "Material (Consumable)",
                  value: ResourceType.Consumable,
                },
                { label: "Tool (Instrument)", value: ResourceType.Instrument },
              ]}
              placeholder="Select type"
            />
          )}
        </form.AppField>


<div className="mt-4">
          <AppFormField
          form={form}
          name="planned_quantity"
          label={`Planned Quantity (${selectedItemType.base_measurement_unit})`}
          placeholder="e.g. 100"
          type="number"
          className="mt-1"
        />
</div>

      </div>

      <div className="flex justify-end gap-3 mt-8">
        <Button
          type="button"
          onClick={onClose}
          className="bg-dracula-foreground/5 hover:bg-dracula-foreground/10 text-dracula-comment"
        >
          Cancel
        </Button>

        <Button
          type="button"
          disabled={isPending}
          onClick={() => form.handleSubmit()}
          className="bg-dracula-purple hover:bg-dracula-purple/90 text-dracula-background font-bold min-w-[100px]"
        >
          {isPending ? "Adding..." : "Add"}
        </Button>
      </div>
    </form>
  );
}
