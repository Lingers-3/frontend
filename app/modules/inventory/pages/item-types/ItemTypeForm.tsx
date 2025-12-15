import { Button } from "~/components/ui/button";
import { AppFormField } from "~/components/form-components/AppFormField";
import type { ItemTypeFull } from "~/modules/inventory/services/item-type/types";
import { useItemTypeForm } from "~/modules/inventory/hooks/use-item-type-form";
import { Select } from "~/components/form-components/Select";

export interface ItemTypeFormProps {
  mode: "create" | "update";
  itemTypeId?: number;
  initialData?: ItemTypeFull;
  onClose: () => void;
}

export default function ItemTypeForm({
  mode,
  itemTypeId,
  initialData,
  onClose,
}: ItemTypeFormProps) {
  const { form, isPending } = useItemTypeForm({
    mode,
    itemTypeId,
    initialData,
    onClose,
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-4 mt-2"
    >
      <AppFormField
        form={form}
        name="name"
        label="Name"
        placeholder="e.g. Dairy Products"
      />

      <AppFormField
        form={form}
        name="description"
        label="Description"
        placeholder="Optional description..."
        isTextarea
      />

      <form.AppField name="base_measurement_unit">
        {(field: any) => (
          <>
            <Select
              label="Measurement unit"
              values={[
                { label: "Millimeter (mm)", value: "mm" },
                { label: "Gram (g)", value: "g" },
                { label: "Milliliter (ml)", value: "ml" },
                { label: "Cubic millimeter (mm³)", value: "mm³" },
                { label: "Square millimeter (mm²)", value: "mm²" },
                { label: "Piece (pcs)", value: "pcs" },
              ]}
              placeholder="Select measurement unit"
            />
            {field.state.meta.errors.length > 0 && (
              <p className="text-dracula-red text-xs">
                {field.state.meta.errors[0]}
              </p>
            )}
          </>
        )}
      </form.AppField>

      {/* <div className="grid grid-cols-2 gap-4">
        <AppFormField
          form={form}
          name="base_measurement_unit"
          label="Base unit"
          placeholder="e.g. ml"
        />

        <AppFormField
          form={form}
          name="display_measurement_unit"
          label="Display unit"
          placeholder="e.g. l"
        />
      </div> */}

      <div className="grid grid-cols-2 gap-4 mt-4">
        <AppFormField
          form={form}
          name="default_quantity"
          label="Default quantity"
          placeholder="1000"
        />

        <AppFormField
          form={form}
          name="shortage_threshold"
          label="Shortage limit"
          placeholder="5000"
        />
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <Button
          type="button"
          onClick={onClose}
          className="bg-dracula-foreground/5 hover:bg-dracula-foreground/10 text-dracula-comment hover:text-dracula-comment"
        >
          Cancel
        </Button>

        <Button
          type="button"
          disabled={isPending}
          onClick={() => form.handleSubmit()}
          className="bg-dracula-purple/80 hover:bg-dracula-purple text-dracula-background font-bold"
        >
          {isPending
            ? mode === "create"
              ? "Creating..."
              : "Updating..."
            : mode === "create"
              ? "Create item type"
              : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
