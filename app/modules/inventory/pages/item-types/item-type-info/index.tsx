import { Link } from "react-router";
import {
  AlertTriangle,
  ArrowLeft,
  Package,
  Trash2,
  Upload,
  Loader2,
} from "lucide-react";
import type { ItemTypeFull } from "~/modules/inventory/services/item-type/types";
import { ItemTypeInfoTags } from "./ItemTypeInfoTags";
import { ItemTypeInfoActions } from "./ItemTypeInfoActions";
import { picture } from "~/modules/inventory/services/picture/picture";
import { useItemTypePicture } from "~/modules/inventory/hooks/pictures-hooks";

interface ItemTypeInfoProps {
  type: ItemTypeFull;
}

export function ItemTypeInfo({ type }: ItemTypeInfoProps) {
  const {
    fileInputRef,
    isLoading,
    handleImageAreaClick,
    handleFileChange,
    handleImageDelete,
  } = useItemTypePicture(type);

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
        <ArrowLeft className="w-4 h-4" /> Back to item types
      </Link>

      <div className="bg-dracula-foreground/10 rounded-2xl border border-dracula-selection p-6 space-y-6">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/png, image/jpeg, image/webp, image/gif"
          onChange={handleFileChange}
        />

        <div
          onClick={handleImageAreaClick}
          className="group relative w-full aspect-square rounded-xl bg-dracula-background border border-dracula-selection flex items-center justify-center text-dracula-purple overflow-hidden cursor-pointer hover:border-dracula-cyan/50 transition-colors"
        >
          {isLoading && (
            <div className="absolute inset-0 bg-dracula-background/80 z-20 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-dracula-cyan" />
            </div>
          )}

          {type.picture_id ? (
            <img
              src={picture.url(type.picture_hash) ?? ""}
              alt={type.name}
              className="w-full h-full object-cover transition-opacity group-hover:opacity-80"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 transition-transform group-hover:scale-105">
              <Package className="w-20 h-20" />
              <span className="text-xs text-dracula-comment font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Click to upload
              </span>
            </div>
          )}

          {type.picture_id && !isLoading && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
              <Upload className="w-8 h-8 text-white drop-shadow-md" />
            </div>
          )}

          {type.picture_id && !isLoading && (
            <button
              onClick={handleImageDelete}
              className="absolute top-2 right-2 z-10 cursor-pointer p-2 bg-dracula-background/80 backdrop-blur-sm border-dracula-selection border-[1px] hover:bg-dracula-red/20 rounded-md text-dracula-comment hover:text-dracula-red transition-all opacity-0 group-hover:opacity-100"
              title="Remove image"
            >
              <Trash2 className="w-4 h-4" />
            </button>
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
