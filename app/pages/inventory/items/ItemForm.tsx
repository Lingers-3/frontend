import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { useItemForm } from "~/hooks/use-item-form";
import type { ItemFull } from "~/services/item/types";

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
        <form.AppField name="item_type_id">
          {(field) => (
            <div className="space-y-1">
              <Label htmlFor={field.name} className="text-dracula-foreground">
                Item Type ID
              </Label>
              <Input
                id={field.name}
                name={field.name}
                type="number"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="bg-dracula-current-line border-dracula-selection text-dracula-foreground"
                placeholder="ID"
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-dracula-red text-xs">
                  {field.state.meta.errors[0]}
                </p>
              )}
            </div>
          )}
        </form.AppField>
      )}

      <form.AppField name="description">
        {(field) => (
          <div className="space-y-1">
            <Label htmlFor={field.name} className="text-dracula-foreground">
              Description
            </Label>
            <Textarea
              id={field.name}
              name={field.name}
              value={field.state.value || ""}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className="bg-dracula-current-line border-dracula-selection text-dracula-foreground resize-none"
              placeholder="Item description (e.g. Brand, Variant)..."
            />
          </div>
        )}
      </form.AppField>

      <div className="grid grid-cols-2 gap-4">
        <form.AppField name="quantity">
          {(field) => (
            <div className="space-y-1">
              <Label htmlFor={field.name} className="text-dracula-foreground">
                Quantity
              </Label>
              <Input
                id={field.name}
                name={field.name}
                type="number"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="bg-dracula-current-line border-dracula-selection text-dracula-foreground"
                placeholder="0"
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-dracula-red text-xs">
                  {field.state.meta.errors[0]}
                </p>
              )}
            </div>
          )}
        </form.AppField>

        <form.AppField name="display_measurement_unit">
          {(field) => (
            <div className="space-y-1">
              <Label htmlFor={field.name} className="text-dracula-foreground">
                Unit
              </Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="bg-dracula-current-line border-dracula-selection text-dracula-foreground"
                placeholder="e.g. pcs, kg"
              />
            </div>
          )}
        </form.AppField>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <form.AppField name="purchase_price">
          {(field) => (
            <div className="space-y-1">
              <Label htmlFor={field.name} className="text-dracula-foreground">
                Price
              </Label>
              <Input
                id={field.name}
                name={field.name}
                type="number"
                step="0.01"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="bg-dracula-current-line border-dracula-selection text-dracula-foreground"
                placeholder="0.00"
              />
            </div>
          )}
        </form.AppField>

        <form.AppField name="expiration_date">
          {(field) => (
            <div className="space-y-1">
              <Label htmlFor={field.name} className="text-dracula-foreground">
                Expiration Date
              </Label>
              <Input
                id={field.name}
                name={field.name}
                type="date"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="bg-dracula-current-line border-dracula-selection text-dracula-foreground"
              />
            </div>
          )}
        </form.AppField>
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
              ? "Add Item"
              : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}