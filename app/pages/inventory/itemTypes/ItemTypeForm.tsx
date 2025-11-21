import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import type { ItemTypeFull } from "~/services/itemType/types";
import { useItemTypeForm } from "~/hooks/use-item-type-form";

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
      <form.AppField name="name">
        {(field) => (
          <div className="space-y-1">
            <Label htmlFor={field.name} className="text-dracula-foreground">
              Name
            </Label>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className="bg-dracula-current-line border-dracula-selection text-dracula-foreground"
              placeholder="e.g. Dairy Products"
            />
            {field.state.meta.errors.length > 0 && (
              <p className="text-dracula-red text-xs">
                {field.state.meta.errors[0]}
              </p>
            )}
          </div>
        )}
      </form.AppField>

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
              placeholder="Optional description..."
            />
          </div>
        )}
      </form.AppField>

      <div className="grid grid-cols-2 gap-4">
        <form.AppField name="base_measurement_unit">
          {(field) => (
            <div className="space-y-1">
              <Label htmlFor={field.name} className="text-dracula-foreground">
                Base Unit
              </Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="bg-dracula-current-line border-dracula-selection text-dracula-foreground"
                placeholder="e.g. ml"
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
                Display Unit
              </Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="bg-dracula-current-line border-dracula-selection text-dracula-foreground"
                placeholder="e.g. l"
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-dracula-red text-xs">
                  {field.state.meta.errors[0]}
                </p>
              )}
            </div>
          )}
        </form.AppField>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <form.AppField name="default_quantity">
          {(field) => (
            <div className="space-y-1">
              <Label htmlFor={field.name} className="text-dracula-foreground">
                Default Qty
              </Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="bg-dracula-current-line border-dracula-selection text-dracula-foreground"
                placeholder="1000"
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-dracula-red text-xs">
                  {field.state.meta.errors[0]}
                </p>
              )}
            </div>
          )}
        </form.AppField>

        <form.AppField name="shortage_threshold">
          {(field) => (
            <div className="space-y-1">
              <Label htmlFor={field.name} className="text-dracula-foreground">
                Shortage Limit
              </Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="bg-dracula-current-line border-dracula-selection text-dracula-foreground"
                placeholder="5000"
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-dracula-red text-xs">
                  {field.state.meta.errors[0]}
                </p>
              )}
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
          onClick={() => {
            console.log("manual submit clicked", { mode, itemTypeId });
            form.handleSubmit();
          }}
          className="bg-dracula-purple/80 hover:bg-dracula-purple text-dracula-background font-bold"
        >
          {isPending
            ? mode === "create"
              ? "Creating..."
              : "Updating..."
            : mode === "create"
              ? "Create Type"
              : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
