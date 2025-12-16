import { Package, Plus, Trash2, Edit2, Box } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Progress } from "~/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "~/components/ui/dialog";
import { useDeleteReservation } from "../../../hooks/projects-hooks";
import { useItems } from "~/modules/inventory/hooks/inventory-hooks";
import { type ResourceSpecificationFull } from "../../../services/project/types";
import AddManualReservationDialog from "../../forms/AddManualReservationDialog";
import UpdateUsageDialog from "../../forms/UpdateUsageDialog";

interface ResourceDetailsDialogProps {
  spec: ResourceSpecificationFull | null;
  projectId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ResourceDetailsDialog = ({
  spec,
  projectId,
  open,
  onOpenChange,
}: ResourceDetailsDialogProps) => {
  const { mutate: deleteReservation } = useDeleteReservation();

  const { data: allItems, isLoading: isLoadingItems } = useItems();

  const availableItems = allItems?.filter(
    (item) => spec && item.item_type_id === spec.item_type_id
  );

  if (!spec) return null;

  const totalReserved = spec.reservations.reduce(
    (acc, r) => acc + r.reserved_quantity,
    0
  );
  const totalUsed = spec.reservations.reduce(
    (acc, r) => acc + r.used_quantity,
    0
  );

  const inStockItems =
    availableItems?.filter((item) => item.quantity > 0) || [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="fixed inset-0 bg-black/10 backdrop-blur-sm" />
      <DialogContent className="max-w-md bg-dracula-background border-dracula-selection p-0 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 pt-16 bg-dracula-current-line/30 border-b border-dracula-selection">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-dracula-foreground flex justify-between items-center">
              {spec.item_type_name}
              <Badge variant="outline" className="text-xs font-normal">
                {spec.resource_type}
              </Badge>
            </DialogTitle>
            <DialogDescription className="text-dracula-comment">
              Resource management
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="flex flex-col">
              <span className="text-xs text-dracula-comment uppercase">
                Planned
              </span>
              <span className="text-xl font-bold text-dracula-foreground">
                {spec.planned_quantity}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-dracula-comment uppercase">
                Reserved
              </span>
              <span className="text-xl font-bold text-dracula-cyan">
                {totalReserved}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-dracula-comment uppercase">
                Used
              </span>
              <span className="text-xl font-bold text-dracula-green">
                {totalUsed}
              </span>
            </div>
          </div>
          <Progress
            value={(totalUsed / spec.planned_quantity) * 100}
            className="h-1.5 mt-4"
          />
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs font-bold text-dracula-comment uppercase tracking-wider">
                Active Reservations
              </h3>
              <span className="text-xs bg-dracula-current-line px-2 py-0.5 rounded-md text-dracula-foreground">
                {spec.reservations.length}
              </span>
            </div>

            <div className="space-y-3">
              {spec.reservations.length === 0 && (
                <div className="text-sm text-dracula-comment italic text-center py-4 border border-dashed border-dracula-selection rounded-xl">
                  No items reserved yet.
                </div>
              )}

              {spec.reservations.map((res) => (
                <div
                  key={res.id}
                  className="bg-dracula-current-line/20 rounded-xl p-3 border border-dracula-selection flex justify-between items-center"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <Box className="w-4 h-4 text-dracula-cyan" />
                      <span className="text-sm font-medium text-dracula-foreground">
                        Item #{res.item_id}
                      </span>
                    </div>
                    <div className="text-xs text-dracula-comment mt-1">
                      Reserved:{" "}
                      <span className="text-dracula-foreground">
                        {res.reserved_quantity}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="block text-[10px] text-dracula-comment uppercase">
                        Used
                      </span>
                      <span className="text-sm font-mono font-bold text-dracula-green">
                        {res.used_quantity}
                      </span>
                    </div>

                    <UpdateUsageDialog
                      projectId={projectId}
                      reservationId={res.id}
                      currentUsed={res.used_quantity}
                      maxReserved={res.reserved_quantity}
                      trigger={
                        <button className="cursor-pointer border-dracula-selection border-[1px] text-dracula-comment hover:text-dracula-purple transition-colors p-2 rounded-md hover:bg-dracula-current-line">
                          <Edit2 className="w-3 h-3" />
                        </button>
                      }
                    />

                    <button
                      onClick={() => {
                        if (
                          confirm("Release this reservation back to inventory?")
                        ) {
                          deleteReservation({
                            id: projectId,
                            specId: spec.id,
                            resId: res.id,
                          });
                          toast.info("Reservation released");
                        }
                      }}
                      className="cursor-pointer p-2 border-dracula-selection border-[1px] hover:bg-dracula-red/10 rounded-md text-dracula-comment hover:text-dracula-red transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs font-bold text-dracula-comment uppercase tracking-wider">
                Available in Inventory
              </h3>
              <span className="text-xs bg-dracula-current-line px-2 py-0.5 rounded-md text-dracula-foreground">
                {inStockItems.length}
              </span>
            </div>

            <div className="space-y-2">
              {isLoadingItems && (
                <div className="text-center py-4 text-dracula-comment">
                  Loading inventory...
                </div>
              )}

              {!isLoadingItems && inStockItems.length === 0 && (
                <div className="text-sm text-dracula-comment italic text-center py-4 border border-dashed border-dracula-selection rounded-xl">
                  No matching items in stock.
                </div>
              )}

              {inStockItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-3 bg-dracula-current-line/10 hover:bg-dracula-current-line/30 rounded-xl border border-dracula-selection/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-dracula-current-line rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-dracula-comment" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-dracula-foreground">
                        Batch #{item.id}
                      </p>
                      <p className="text-xs text-dracula-comment">
                        Available:{" "}
                        <span className="text-dracula-green font-mono">
                          {item.quantity}
                        </span>
                      </p>
                    </div>
                  </div>

                  <AddManualReservationDialog
                    projectId={projectId}
                    specId={spec.id}
                    itemId={item.id}
                    itemName={`${spec.item_type_name} #${item.id}`}
                    maxAvailable={item.quantity}
                    trigger={
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-dracula-purple hover:bg-dracula-purple/10 hover:text-dracula-purple rounded-full p-2 h-auto"
                      >
                        <Plus className="w-5 h-5" />
                      </Button>
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
