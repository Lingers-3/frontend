import type { ItemFull } from "../item/types";
import type { TagShort } from "../tag/types";

export interface ItemType {
  id: number;
  name: string;
  description: string | null;
  base_measurement_unit: string;
  display_measurement_unit: string;
  default_quantity: number | null;
  shortage_threshold: number | null;
  picture_id: number | null;
  picture_hash: string | null; 
  item_ids: number[];
  tag_ids: number[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ItemTypeCreate {
  name: string;
  base_measurement_unit: string;
  display_measurement_unit: string;
  description?: string | null;
  default_quantity?: number | null;
  shortage_threshold?: number | null;
  tag_ids?: number[];
  picture_id?: number | null; 
}

export interface ItemTypeUpdate {
  name?: string;
  description?: string | null;
  base_measurement_unit?: string;
  display_measurement_unit?: string;
  default_quantity?: number | null;
  shortage_threshold?: number | null;
  tag_ids?: number[];
  picture_id?: number | null; 
  restore?: boolean;
}

export interface ItemTypeDeleteResponse {
  hard: boolean;
}

export interface ItemTypeFull {
  id: number;
  name: string;
  description: string | null;
  base_measurement_unit: string;
  display_measurement_unit: string;
  default_quantity: number | null;
  shortage_threshold: number | null;
  picture_id: number | null;
  picture_hash: string | null; 
  items: ItemFull[];
  tags: TagShort[];
  created_at: string;
  updated_at: string;
}
