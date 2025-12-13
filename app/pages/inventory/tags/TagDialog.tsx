import { Tag, Edit } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog";
import type { TagShort } from "~/services/tag/types";
import TagForm from "./TagForm";

type TagDialogProps =
  | {
      mode: "create";
      tag?: never;
      trigger: React.ReactNode;
      targetId?: number;
      targetType?: "item" | "item_type";
    }
  | {
      mode: "update";
      tag: TagShort;
      trigger: React.ReactNode;
      targetId?: never;
      targetType?: never;
    };

export default function TagDialog({
  mode,
  tag: tagData,
  trigger,
  targetId,
  targetType,
}: TagDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="rounded-2xl bg-dracula-background border-dracula-selection max-w-md"
      >
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-dracula-current-line rounded-full">
              {mode === "create" ? (
                <Tag className="h-6 w-6 text-dracula-pink" />
              ) : (
                <Edit className="h-6 w-6 text-dracula-cyan" />
              )}
            </div>
            <div>
              <DialogTitle className="text-dracula-foreground text-xl">
                {mode === "create" ? "Create tag" : "Edit tag"}
              </DialogTitle>
              <DialogDescription className="text-dracula-comment">
                {mode === "create"
                  ? `Create a new tag on this ${targetType === "item" ? "item" : "item type"}.`
                  : "Update the details of this tag (this will update the tag everywhere)."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <TagForm
          mode={mode}
          tagId={tagData?.id}
          initialData={mode === "update" ? tagData : undefined}
          targetId={targetId}
          targetType={targetType}
          onClose={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
