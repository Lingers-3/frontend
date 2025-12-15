import { Button } from "~/components/ui/button";
import { AppFormField } from "~/components/form-components/AppFormField";
import type { ProjectFull } from "../../services/types";
import { useProjectForm } from "../../hooks/use-project-form";

export interface ProjectFormProps {
  mode: "create" | "update";
  projectId?: number;
  initialData?: ProjectFull;
  onClose: () => void;
}

export default function ProjectForm({
  mode,
  projectId,
  initialData,
  onClose,
}: ProjectFormProps) {
  const { form, isPending } = useProjectForm({
    mode,
    projectId,
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
        placeholder="e.g. Build a Birdhouse"
      />

      <AppFormField
        form={form}
        name="description"
        label="Description"
        placeholder="Optional description of the project..."
        isTextarea
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
          {isPending
            ? mode === "create"
              ? "Creating..."
              : "Updating..."
            : mode === "create"
              ? "Create project"
              : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
