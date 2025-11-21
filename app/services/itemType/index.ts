import axios, { type AxiosError } from "axios";
import api, { type ApiError } from "~/lib/api"; 
import { type Result, Ok, Err } from "~/lib/result"; 
import type {
  ItemType,
  ItemTypeCreate,
  ItemTypeUpdate,
  ItemTypeDeleteResponse,
  ItemTypeFull,
} from "./types";

export class itemType {
  static async full(): Promise<Result<ItemTypeFull[], ApiError>> {
    try {
      const response = await api.get<ItemTypeFull[]>("/item-types/full");
      return Ok(response.data);
    } catch (e) {
      return Err(itemType.error(e));
    }
  }
  
  static async create(
    payload: ItemTypeCreate
  ): Promise<Result<ItemType, ApiError>> {
    try {
      const response = await api.post<ItemType>("/item-types", payload);
      return Ok(response.data);
    } catch (e) {
      return Err(itemType.error(e));
    }
  }

  static async getAll(): Promise<Result<ItemType[], ApiError>> {
    try {
      const response = await api.get<ItemType[]>("/item-types");
      return Ok(response.data);
    } catch (e) {
      return Err(itemType.error(e));
    }
  }

  static async get(id: number): Promise<Result<ItemType, ApiError>> {
    try {
      const response = await api.get<ItemType>(`/item-types/${id}`);
      return Ok(response.data);
    } catch (e) {
      return Err(itemType.error(e));
    }
  }

  static async update(
    id: number,
    payload: ItemTypeUpdate
  ): Promise<Result<ItemType, ApiError>> {
    try {
      const response = await api.patch<ItemType>(
        `/item-types/${id}`,
        payload
      );
      return Ok(response.data);
    } catch (e) {
      return Err(itemType.error(e));
    }
  }

  static async delete(
    id: number,
    force: boolean = false
  ): Promise<Result<ItemTypeDeleteResponse, ApiError>> {
    try {
      const url = `/item-types/${id}?force=${force}`;
      const response = await api.delete<ItemTypeDeleteResponse>(url);
      return Ok(response.data);
    } catch (e) {
      return Err(itemType.error(e));
    }
  }

  static error(err: unknown): ApiError {
    if (axios.isAxiosError(err)) {
      const axiosError = err as AxiosError<{ error?: string }>;

      return {
        status: axiosError.response?.status,
        message:
          axiosError.response?.data?.error ||
          axiosError.message ||
          "An unknown error occurred",
      };
    }

    if (err instanceof Error) {
      return {
        message: err.message,
      };
    }

    return {
      message: "A totally unknown error occurred",
    };
  }
}