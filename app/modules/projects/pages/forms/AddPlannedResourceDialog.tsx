import { Plus, ArrowLeft } from "lucide-react";
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
import AddPlannedResourceForm from "./AddPlannedResourceForm";
import type { ItemTypeFull } from "~/modules/inventory/services/item-type/types";
import ResourceTypePicker from "../project-page/resources/ResourceTypePicker";

interface AddPlannedResourceDialogProps {
  projectId: number;
  trigger?: React.ReactNode;
}

export default function AddPlannedResourceDialog({
  projectId,
  trigger,
}: AddPlannedResourceDialogProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedType, setSelectedType] = useState<ItemTypeFull | null>(null);

  const reset = () => {
    setStep(1);
    setSelectedType(null);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(reset, 300);
  };

  const handleSelectType = (type: ItemTypeFull) => {
    setSelectedType(type);
    setStep(2);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (!val) setTimeout(reset, 300);
      }}
    >
      <DialogTrigger asChild>
        {trigger || (
          <button className="flex items-center gap-2 px-4 py-2 bg-dracula-purple text-dracula-background rounded-xl font-bold hover:bg-dracula-purple/90 transition-colors">
            <Plus className="w-5 h-5" />
            Add Resource
          </button>
        )}
      </DialogTrigger>

      <DialogOverlay className="fixed inset-0 bg-black/10 backdrop-blur-sm" />

      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="rounded-2xl bg-dracula-background border-dracula-selection max-w-lg min-h-[400px] flex flex-col"
      >
        <DialogHeader>
          <div className="flex items-center gap-2">
            {step === 2 && (
              <button
                onClick={() => setStep(1)}
                className="p-1 -ml-2 rounded-full hover:bg-dracula-current-line text-dracula-comment transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <DialogTitle className="text-dracula-foreground text-xl">
                {step === 1 ? "Select resource type" : "Configure resource"}
              </DialogTitle>
              <DialogDescription className="text-dracula-comment">
                {step === 1
                  ? "Choose an item type from your catalog."
                  : `Set planning details for ${selectedType?.name}.`}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 mt-2">
          {step === 1 && <ResourceTypePicker onSelect={handleSelectType} />}

          {step === 2 && selectedType && (
            <AddPlannedResourceForm
              projectId={projectId}
              selectedItemType={selectedType}
              onClose={handleClose}
              onBack={() => setStep(1)}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
