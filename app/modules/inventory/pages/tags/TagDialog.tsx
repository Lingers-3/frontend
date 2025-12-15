import { Tag, Edit } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogOverlay,
} from "~/components/ui/dialog";
import type { TagShort } from "~/modules/inventory/services/tag/types";
import TagForm from "./TagForm";
import { TagExistingSelect } from "./TagExistingSelect";
import { cn } from "~/lib/utils";

type TagDialogProps =
  | {
      mode: "create";
      tag?: never;
      trigger: React.ReactNode;
      targetId?: number;
      targetType?: "item" | "item_type";
      currentTagIds?: number[];
    }
  | {
      mode: "update";
      tag: TagShort;
      trigger: React.ReactNode;
      targetId?: never;
      targetType?: never;
      currentTagIds?: never;
    };

export default function TagDialog({
  mode,
  tag: tagData,
  trigger,
  targetId,
  targetType,
  currentTagIds = [],
}: TagDialogProps) {
  const [open, setOpen] = useState(false);

  const [tab, setTab] = useState<"new" | "existing">("existing");

  const showToggle = mode === "create" && !!targetId;

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (!val) setTab("existing");
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      {targetType == "item_type" && (
        <DialogOverlay className="fixed inset-0 bg-black/10 backdrop-blur-sm" />
      )}
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="rounded-2xl bg-dracula-background border-dracula-selection max-w-md"
      >
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-dracula-current-line rounded-full">
              {mode === "create" ? (
                <Tag className="h-6 w-6 text-dracula-cyan" />
              ) : (
                <Edit className="h-6 w-6 text-dracula-cyan" />
              )}
            </div>
            <div>
              <DialogTitle className="text-dracula-foreground text-xl">
                {mode === "create" ? "Add tag" : "Edit tag"}
              </DialogTitle>
              <DialogDescription className="text-dracula-comment">
                {mode === "create"
                  ? `Attach a tag to this ${targetType === "item" ? "item" : "item type"}.`
                  : "Update the details of this tag globally."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {showToggle && (
          <div className="relative flex h-10 w-full items-center rounded-lg bg-dracula-current-line p-1 mb-2">
            <div
              className={cn(
                "absolute h-8 w-[calc(50%-4px)] rounded-md bg-dracula-background shadow-sm transition-all duration-300 ease-in-out",
                tab === "existing" ? "left-1" : "left-[calc(50%+2px)]"
              )}
            />

            <button
              onClick={() => setTab("existing")}
              className={cn(
                "cursor-pointer relative z-10 flex-1 text-center text-sm transition-colors duration-200",
                tab === "existing"
                  ? "text-dracula-foreground font-medium"
                  : "text-dracula-comment hover:text-dracula-foreground/80"
              )}
            >
              Select existing
            </button>

            <button
              onClick={() => setTab("new")}
              className={cn(
                "cursor-pointer relative z-10 flex-1 text-center text-sm transition-colors duration-200",
                tab === "new"
                  ? "text-dracula-foreground font-medium"
                  : "text-dracula-comment hover:text-dracula-foreground/80"
              )}
            >
              Create new
            </button>
          </div>
        )}

        {mode === "update" ||
        (mode === "create" && (!showToggle || tab === "new")) ? (
          <TagForm
            mode={mode}
            tagId={tagData?.id}
            initialData={mode === "update" ? tagData : undefined}
            targetId={targetId}
            targetType={targetType}
            onClose={() => setOpen(false)}
          />
        ) : (
          <TagExistingSelect
            targetId={targetId!}
            targetType={targetType!}
            currentTagIds={currentTagIds}
            onClose={() => setOpen(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
