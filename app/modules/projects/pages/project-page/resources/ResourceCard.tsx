import { Trash2, AlertTriangle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Progress } from "~/components/ui/progress";
import { cn } from "~/lib/utils";
import { useRemovePlannedResource } from "../../../hooks/projects-hooks";
import {
  ResourceType,
  type ResourceSpecificationFull,
} from "../../../services/project/types";

interface ResourceCardProps {
  spec: ResourceSpecificationFull;
  mode: "planning" | "active";
  projectId: number;
  onClick?: () => void;
}

export const ResourceCard = ({
  spec,
  mode,
  projectId,
  onClick,
}: ResourceCardProps) => {
  const { mutate: removeSpec } = useRemovePlannedResource();

  const totalReserved = spec.reservations.reduce(
    (acc, res) => acc + res.reserved_quantity,
    0
  );
  const totalUsed = spec.reservations.reduce(
    (acc, res) => acc + res.used_quantity,
    0
  );
  const isShortage = totalReserved < spec.planned_quantity;
  const progressPercent = Math.min(
    (totalUsed / spec.planned_quantity) * 100,
    100
  );

  return (
    <div
      onClick={mode === "active" ? onClick : undefined}
      className={cn(
        "group relative flex flex-col bg-dracula-current-line/30 border border-dracula-selection rounded-xl p-4 transition-all hover:border-dracula-purple/50",
        mode === "active" && "cursor-pointer hover:bg-dracula-current-line/50"
      )}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold",
              spec.resource_type === ResourceType.Consumable
                ? "bg-dracula-cyan/10 text-dracula-cyan"
                : "bg-dracula-orange/10 text-dracula-orange"
            )}
          >
            {spec.resource_type === ResourceType.Consumable ? "Mat" : "Tool"}
          </div>
          <div>
            <h4 className="font-bold text-dracula-foreground text-sm line-clamp-1">
              {spec.item_type_name}
            </h4>
            <p className="text-xs text-dracula-comment">{spec.resource_type}</p>
          </div>
        </div>

        {mode === "planning" && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 border-dracula-selection border-[1px] text-dracula-comment hover:text-dracula-red hover:bg-dracula-red/10"
            onClick={(e) => {
              e.stopPropagation();
              if (confirm("Remove this resource from plan?")) {
                removeSpec({ id: projectId, specId: spec.id });
                toast.info("Resource removed");
              }
            }}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}

        {mode === "active" && (
          <Badge
            variant="outline"
            className={cn(
              "gap-1",
              isShortage
                ? "border-dracula-red text-dracula-red bg-dracula-red/5"
                : "border-dracula-green text-dracula-green bg-dracula-green/5"
            )}
          >
            {isShortage ? (
              <>
                <AlertTriangle className="w-3 h-3" /> Shortage
              </>
            ) : (
              <>
                <CheckCircle2 className="w-3 h-3" /> Secured
              </>
            )}
          </Badge>
        )}
      </div>

      <div className="mt-auto">
        {mode === "planning" ? (
          <div className="flex justify-between items-end border-t border-dracula-selection/50 pt-3">
            <span className="text-xs text-dracula-comment uppercase font-bold tracking-wider">
              Planned
            </span>
            <span className="text-lg font-mono font-bold text-dracula-foreground">
              {spec.planned_quantity}
            </span>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-dracula-comment">Progress</span>
              <span className="text-dracula-foreground font-mono">
                {totalUsed} / {spec.planned_quantity}
              </span>
            </div>
            <Progress value={progressPercent} className="h-2" />

            <div className="grid grid-cols-3 gap-2 border-t border-dracula-selection/50 pt-2 mt-2">
              <div className="text-center">
                <p className="text-[10px] text-dracula-comment uppercase">
                  Plan
                </p>
                <p className="text-sm font-mono font-medium">
                  {spec.planned_quantity}
                </p>
              </div>
              <div className="text-center border-l border-dracula-selection/50">
                <p className="text-[10px] text-dracula-comment uppercase">
                  Rsrv
                </p>
                <p
                  className={cn(
                    "text-sm font-mono font-medium",
                    isShortage ? "text-dracula-red" : "text-dracula-cyan"
                  )}
                >
                  {totalReserved}
                </p>
              </div>
              <div className="text-center border-l border-dracula-selection/50">
                <p className="text-[10px] text-dracula-comment uppercase">
                  Used
                </p>
                <p className="text-sm font-mono font-medium text-dracula-green">
                  {totalUsed}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
