export interface Tag {
  id: number;
  user_id: number;
  color: string | null;
  name: string;
  item_ids: number[] | null;
  item_type_ids: number[] | null;
  created_at: string; 
  updated_at: string;
}

export interface TagCreate {
  name: string;
  color?: string | null;
  target_type?: "item" | "item_type";
  target_id?: number;
}

export interface TagUpdate {
  name?: string;
  color?: string | null;
}

export interface TagShort {
  id: number;
  name: string;
  color: string | null;
  created_at: string;
  updated_at: string;
}