import { Button } from "~/components/ui/button";
import { AppFormField } from "~/components/form-components/AppFormField";
import { useProjectMetricsForm, type ProjectMetricsFormProps } from "../../hooks/use-project-metrics-form";


export default function ProjectMetricsForm(props: ProjectMetricsFormProps) {
  const { form, isPending } = useProjectMetricsForm(props);
  const { metricsType, onClose } = props;

  const labelPrefix = metricsType === "plan" ? "Planned" : "Actual";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-4 mt-2"
    >
      <div className="grid grid-cols-2 gap-4">
        <AppFormField
          form={form}
          name="income"
          label={`${labelPrefix} Income`}
          placeholder="0.00"
          type="number"
        />

        <AppFormField
          form={form}
          name="work_time"
          label={`${labelPrefix} Time (hours)`}
          placeholder="0"
          type="number"
        />
      </div>

      <AppFormField
        form={form}
        name="deadline"
        label={`${labelPrefix} Deadline`}
        type="date"
      />

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
          {isPending ? "Saving..." : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
