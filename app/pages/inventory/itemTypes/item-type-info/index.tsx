import { Link } from "react-router";
import {
  AlertTriangle,
  ArrowLeft,
  Package,
} from "lucide-react";
import type { ItemTypeFull } from "~/services/itemType/types";
import { ItemTypeInfoTags } from "./ItemTypeInfoTags";
import { ItemTypeInfoActions } from "./ItemTypeInfoActions";

interface ItemTypeInfoProps {
  type: ItemTypeFull;
}

export function ItemTypeInfo({ type }: ItemTypeInfoProps) {
  const totalQuantity = type.items.reduce((acc, i) => acc + i.quantity, 0);
  const hasShortage =
    type.shortage_threshold !== null && totalQuantity < type.shortage_threshold;

  return (
    <aside className="w-full md:w-80 shrink-0 top-6 h-fit pt-2">
      <Link
        to=".."
        relative="path"
        className="inline-flex items-center gap-1 text-lg text-dracula-comment hover:text-dracula-cyan mb-7 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to types
      </Link>

      <div className="bg-dracula-foreground/10 rounded-2xl border border-dracula-selection p-6 space-y-6">
        <div className="w-full aspect-square rounded-xl bg-dracula-background border border-dracula-selection flex items-center justify-center text-dracula-purple overflow-hidden">
          {type.picture_id ? (
            <img
              src={`/api/images/${type.picture_id}`}
              alt={type.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <Package className="w-20 h-20" />
          )}
        </div>

        <div>
          <h1 className="text-2xl font-bold text-dracula-foreground mb-2">
            {type.name}
          </h1>
          <p className="text-sm text-dracula-comment">
            {type.description || "No description provided."}
          </p>
        </div>

        <div className="bg-dracula-background rounded-xl p-4 border border-dracula-selection">
          <div className="text-xs text-dracula-comment mb-1">Total stock</div>
          <div
            className={`text-3xl font-bold flex items-baseline gap-2 ${
              hasShortage ? "text-dracula-red" : "text-dracula-green"
            }`}
          >
            {totalQuantity}
            <span className="text-base font-normal text-dracula-foreground">
              {type.display_measurement_unit}
            </span>
          </div>
          <div className="text-xs text-dracula-comment mt-1">
            Across {type.items.length} items
          </div>
          {hasShortage && (
            <div className="flex items-center gap-1 text-xs text-dracula-red mt-2">
              <AlertTriangle className="w-3 h-3" />
              Below threshold ({type.shortage_threshold})
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-dracula-comment">Measurement unit:</span>
          <span className="text-dracula-foreground font-medium">
            {type.display_measurement_unit}
          </span>
        </div>

        <ItemTypeInfoTags type={type} />

        <ItemTypeInfoActions type={type} />
      </div>
    </aside>
  );
}
