import { Plus, TagIcon, X } from "lucide-react";
import { useUpdateItemType } from "~/modules/inventory/hooks/inventory-hooks";
import type { ItemTypeFull } from "~/modules/inventory/services/item-type/types";
import TagDialog from "../../tags/TagDialog";

interface ItemTypeInfoTagsProps {
  type: ItemTypeFull;
}

export function ItemTypeInfoTags({ type }: ItemTypeInfoTagsProps) {
  const { mutate: update } = useUpdateItemType();

  return (
    <div>
      <div className="text-xs text-dracula-comment mb-2 flex items-center gap-1">
        <TagIcon className="w-3 h-3" />
        Tags
      </div>
      <div className="flex flex-wrap gap-2">
        {type.tags.map((tag) => (
          <span
            key={tag.id}
            className="inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-medium bg-dracula-background border border-dracula-selection"
            style={{
              color: `#${tag.color}` || "var(--color-dracula-cyan)",
              borderColor: tag.color
                ? `#${tag.color}40`
                : "var(--color-dracula-selection)",
              borderWidth: "2px",
            }}
          >
            <TagDialog
              tag={tag}
              mode="update"
              trigger={
                <div className="cursor-pointer m-0 p-0 flex">{tag.name}</div>
              }
            />
            <X
              size={15}
              className="cursor-pointer ml-2"
              onClick={() => {
                update({
                  id: type.id,
                  payload: {
                    ...type,
                    tag_ids: type.tags
                      .filter((_tag) => _tag.id != tag.id)
                      .map((tag) => tag.id),
                  },
                });
              }}
            />
          </span>
        ))}
        <TagDialog
          mode="create"
          targetId={type.id}
          targetType="item_type"
          currentTagIds={type.tags ? type.tags.map((t) => t.id) : []}
          trigger={
            <span className="cursor-pointer inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-medium bg-dracula-background border border-dracula-selection hover:border-amber-200 duration-200 transition-all">
              <Plus size={15} />
            </span>
          }
        />
      </div>
    </div>
  );
}
