import type { TagShort } from "../tag/types";

export interface Item {
  id: number;
  description: string | null;
  quantity: number;
  expiration_date: string | null;
  display_measurement_unit: string;
  purchase_price: number | null;
  item_type_id: number;
  tag_ids: number[];
  created_at: string; 
  updated_at: string; 
  deleted_at: string | null; 
}

export interface ItemCreate {
  item_type_id: number;
  description?: string | null;
  quantity?: number;
  expiration_date?: string | null; 
  display_measurement_unit?: string; 
  purchase_price?: number | null;
  tag_ids?: number[];
}

export interface ItemUpdate {
  description?: string | null;
  quantity?: number;
  expiration_date?: string | null;
  display_measurement_unit?: string;
  purchase_price?: number | null;
  tag_ids?: number[];
}

export interface ItemDeleteResponse {
  hard: boolean; 
}

export interface ItemFull {
  id: number;
  description: string | null;
  quantity: number;
  expiration_date: string | null;
  display_measurement_unit: string;
  purchase_price: number | null;
  tags: TagShort[];
  created_at: string;
  updated_at: string;
}