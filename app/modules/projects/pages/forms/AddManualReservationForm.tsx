import { Button } from "~/components/ui/button";
import { AppFormField } from "~/components/form-components/AppFormField";
import { useAddManualReservationForm, type AddManualReservationFormProps } from "../../hooks/use-add-manual-reservation-form";

export default function AddManualReservationForm(
  props: AddManualReservationFormProps
) {
  const { form, isPending } = useAddManualReservationForm(props);

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
        name="reserved_quantity"
        label={`Quantity to reserve (available: ${props.maxAvailable})`}
        placeholder="e.g. 50"
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
          className="bg-dracula-green/80 hover:bg-dracula-green text-dracula-background font-bold"
        >
          {isPending ? "Reserving..." : "Reserve"}
        </Button>
      </div>
    </form>
  );
}
