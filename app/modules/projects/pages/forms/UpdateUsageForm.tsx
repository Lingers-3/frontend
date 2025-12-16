import { Button } from "~/components/ui/button";
import { AppFormField } from "~/components/form-components/AppFormField";
import {
  useUpdateUsageForm,
  type UpdateUsageFormProps,
} from "../../hooks/use-update-usage-form";

export default function UpdateUsageForm(props: UpdateUsageFormProps) {
  const { form, isPending } = useUpdateUsageForm(props);

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
        name="used_quantity"
        label={`Used Quantity (Max: ${props.maxReserved})`}
        placeholder="0"
        type="number"
      />

      <div className="flex justify-end gap-3 mt-6">
        <Button
          type="button"
          onClick={props.onClose}
          className="bg-dracula-foreground/5 hover:bg-dracula-foreground/10 text-dracula-comment hover:text-dracula-comment"
        >
          Cancel
        </Button>

        <Button
          type="button"
          disabled={isPending}
          onClick={() => form.handleSubmit()}
          className="bg-dracula-cyan/80 hover:bg-dracula-cyan text-dracula-background font-bold"
        >
          {isPending ? "Saving..." : "Update Usage"}
        </Button>
      </div>
    </form>
  );
}
