import { useMutation } from "@tanstack/react-query";
import { unwrap } from "~/lib/result";
import { picture } from "../services/picture/picture";
import { useRef } from "react";
import { toast } from "sonner";
import type { ItemTypeFull } from "../services/item-type/types";
import { useUpdateItemType } from "./inventory-hooks";

export const useUploadPicture = () => {
  return useMutation({
    mutationFn: (file: File) => unwrap(picture.upload(file)),
  });
};

export const useDeletePicture = () => {
  return useMutation({
    mutationFn: (id: number) => unwrap(picture.delete(id)),
  });
};

export function useItemTypePicture(type: ItemTypeFull) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadPicture = useUploadPicture();
  const deletePicture = useDeletePicture();
  const updateItemType = useUpdateItemType();

  const isLoading =
    uploadPicture.isPending ||
    deletePicture.isPending ||
    updateItemType.isPending;

  const handleImageAreaClick = () => {
    if (isLoading) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    event.target.value = "";

    const oldPictureId = type.picture_id;

    try {
      const newPicture = await uploadPicture.mutateAsync(file);

      await updateItemType.mutateAsync({
        id: type.id,
        payload: { picture_id: newPicture.id },
      });

      if (oldPictureId) {
        deletePicture.mutateAsync(oldPictureId).catch((err) => {
          console.error("Failed to cleanup old picture", err);
        });
      }

      toast.success("Image updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update image");
    }
  };

  const handleImageDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!type.picture_id) return;

    const pictureIdToDelete = type.picture_id;

    try {
      await updateItemType.mutateAsync({
        id: type.id,
        payload: { picture_id: null },
      });

      await deletePicture.mutateAsync(pictureIdToDelete);

      toast.success("Image removed");
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove image");
    }
  };

  return {
    fileInputRef,
    isLoading,
    handleImageAreaClick,
    handleFileChange,
    handleImageDelete,
  };
}
