import { Button } from "~/components/ui/button";
import { AppFormField } from "~/components/form-components/AppFormField";
import type { TagShort } from "~/modules/inventory/services/tag/types";
import { useTagForm } from "~/modules/inventory/hooks/use-tag-form";

export interface TagFormProps {
  mode: "create" | "update";
  tagId?: number;
  initialData?: TagShort;
  onClose: () => void;
  targetId?: number;
  targetType?: "item" | "item_type";
}

export default function TagForm({
  mode,
  tagId,
  initialData,
  onClose,
  targetId,
  targetType,
}: TagFormProps) {
  const { form, isPending } = useTagForm({
    mode,
    tagId,
    initialData,
    onClose,
    targetId,
    targetType,
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
        placeholder="e.g. Expired, Urgent, Freezer"
      />

      <div className="flex gap-4 items-start">
        <div className="flex-1">
          <AppFormField
            form={form}
            name="color"
            label="Color (Hex)"
            placeholder="#ff5555"
          />
        </div>
        
        <form.AppField name="color">
          {(field: any) => (
            <div className="flex flex-col">
              <label className="text-sm font-medium text-dracula-foreground">
                Picker
              </label>
              <input 
                type="color"
                className="h-10 w-14 p-1 rounded bg-dracula-current-line cursor-pointer"
                value={field.state.value || "#ffffff"}
                onChange={(e) => field.handleChange(e.target.value)}
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
              ? "Create tag"
              : "Save changes"}
        </Button>
      </div>
    </form>
  );
}