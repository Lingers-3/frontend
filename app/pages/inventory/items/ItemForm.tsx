import { Button } from "~/components/ui/button";
import { useItemForm } from "~/hooks/use-item-form";
import type { ItemFull } from "~/services/item/types";
import { AppFormField } from "~/components/form-components/AppFormField"; 

export interface ItemFormProps {
  mode: "create" | "update";
  itemId?: number;
  initialData?: ItemFull;
  defaultItemTypeId?: number;
  onClose: () => void;
}

export default function ItemForm({
  mode,
  itemId,
  initialData,
  defaultItemTypeId,
  onClose,
}: ItemFormProps) {
  const { form, isPending } = useItemForm({
    mode,
    itemId,
    initialData,
    defaultItemTypeId,
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
      {mode === "create" && !defaultItemTypeId && (
        <AppFormField
          form={form}
          name="item_type_id"
          label="Item type ID"
          placeholder="ID"
        />
      )}

      <AppFormField
        form={form}
        name="description"
        label="Description"
        placeholder="Item description (e.g. Brand, Variant)..."
        isTextarea
      />

      <div className="grid grid-cols-2 gap-4">
        <AppFormField
          form={form}
          name="quantity"
          label="Quantity"
          placeholder="0"
        />

        <AppFormField
          form={form}
          name="display_measurement_unit"
          label="Unit"
          placeholder="e.g. pcs, kg"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <AppFormField
          form={form}
          name="purchase_price"
          label="Price"
          placeholder="0.00"
        />

        <AppFormField
          form={form}
          name="expiration_date"
          label="Expiration date"
          type="date"
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
              ? "Add item"
              : "Save changes"}
        </Button>
      </div>
    </form>
  );
}