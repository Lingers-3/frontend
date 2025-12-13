import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { item } from "~/services/item";
import { itemType } from "~/services/itemType";
import { tag } from "~/services/tag";
import { unwrap } from "~/lib/result";
import type { ItemCreate, ItemUpdate } from "~/services/item/types";
import type { ItemTypeCreate, ItemTypeUpdate } from "~/services/itemType/types";
import type { TagCreate, TagUpdate } from "~/services/tag/types";

export const INVENTORY_KEYS = {
  all: ["inventory"] as const,
  items: {
    root: ["inventory", "items"] as const,
    full: ["inventory", "items", "full"] as const,
  },
  itemTypes: {
    root: ["inventory", "itemTypes"] as const,
    full: ["inventory", "itemTypes", "full"] as const,
  },
  tags: {
    root: ["inventory", "tags"] as const,
    list: ["inventory", "tags", "list"] as const,
  },
};

export const useItemTypesFull = () => {
  return useQuery({
    queryKey: INVENTORY_KEYS.itemTypes.full,
    queryFn: () => unwrap(itemType.full()),
  });
};

export const useItemType = (id: number) => {
  return useQuery({
    queryKey: ["inventory", "itemTypes", id],
    queryFn: () => unwrap(itemType.get(id)),
  });
};

export const useCreateItemType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ItemTypeCreate) => unwrap(itemType.create(payload)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INVENTORY_KEYS.itemTypes.root });
    },
  });
};

export const useUpdateItemType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: ItemTypeUpdate }) =>
      unwrap(itemType.update(id, payload)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INVENTORY_KEYS.itemTypes.root });
    },
  });
};

export const useDeleteItemType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, force }: { id: number; force?: boolean }) =>
      unwrap(itemType.delete(id, force)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INVENTORY_KEYS.itemTypes.root });
      queryClient.invalidateQueries({ queryKey: INVENTORY_KEYS.items.root });
    },
  });
};

export const useBulkDeleteItemTypes = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ ids, force }: { ids: number[]; force?: boolean }) => {
      const promises = ids.map((id) => unwrap(itemType.delete(id, force)));
      return Promise.all(promises);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INVENTORY_KEYS.itemTypes.root });
      queryClient.invalidateQueries({ queryKey: INVENTORY_KEYS.items.root });
    },
  });
};

export const useItemsFull = () => {
  return useQuery({
    queryKey: INVENTORY_KEYS.items.full,
    queryFn: () => unwrap(item.full()),
  });
};

export const useCreateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ItemCreate) => unwrap(item.create(payload)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INVENTORY_KEYS.items.root });
      queryClient.invalidateQueries({ queryKey: INVENTORY_KEYS.itemTypes.root });
    },
  });
};

export const useUpdateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: ItemUpdate }) =>
      unwrap(item.update(id, payload)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INVENTORY_KEYS.items.root });
      queryClient.invalidateQueries({ queryKey: INVENTORY_KEYS.itemTypes.root });
    },
  });
};

export const useDeleteItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, force }: { id: number; force?: boolean }) =>
      unwrap(item.delete(id, force)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INVENTORY_KEYS.items.root });
      queryClient.invalidateQueries({ queryKey: INVENTORY_KEYS.itemTypes.root });
    },
  });
};

export const useTags = () => {
  return useQuery({
    queryKey: INVENTORY_KEYS.tags.list,
    queryFn: () => unwrap(tag.getAll()),
  });
};

export const useCreateTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: TagCreate) => unwrap(tag.create(payload)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INVENTORY_KEYS.tags.root });
      queryClient.invalidateQueries({ queryKey: INVENTORY_KEYS.items.full });
      queryClient.invalidateQueries({ queryKey: INVENTORY_KEYS.itemTypes.full });
    },
  });
};

export const useUpdateTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: TagUpdate }) =>
      unwrap(tag.update(id, payload)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INVENTORY_KEYS.tags.root });
      queryClient.invalidateQueries({ queryKey: INVENTORY_KEYS.items.full });
      queryClient.invalidateQueries({ queryKey: INVENTORY_KEYS.itemTypes.full });
    },
  });
};

export const useDeleteTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => unwrap(tag.delete(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INVENTORY_KEYS.tags.root });
      queryClient.invalidateQueries({ queryKey: INVENTORY_KEYS.items.full });
      queryClient.invalidateQueries({ queryKey: INVENTORY_KEYS.itemTypes.full });
    },
  });
};