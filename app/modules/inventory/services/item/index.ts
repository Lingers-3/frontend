import axios, { type AxiosError } from "axios";
import api, { type ApiError } from "~/lib/api"; 
import { type Result, Ok, Err } from "~/lib/result"; 
import type {
  Item,
  ItemCreate,
  ItemUpdate,
  ItemDeleteResponse,
  ItemFull,
} from "./types";

export class item {
  static async full(): Promise<Result<ItemFull[], ApiError>> {
    try {
      const response = await api.get<ItemFull[]>("/items/full");
      return Ok(response.data);
    } catch (e) {
      return Err(item.error(e));
    }
  }
  
  static async create(payload: ItemCreate): Promise<Result<Item, ApiError>> {
    try {
      const response = await api.post<Item>("/items", payload);
      return Ok(response.data);
    } catch (e) {
      return Err(item.error(e));
    }
  }

  static async getAll(): Promise<Result<Item[], ApiError>> {
    try {
      const response = await api.get<Item[]>("/items");
      return Ok(response.data);
    } catch (e) {
      return Err(item.error(e));
    }
  }

  static async get(id: number): Promise<Result<Item, ApiError>> {
    try {
      const response = await api.get<Item>(`/items/${id}`);
      return Ok(response.data);
    } catch (e) {
      return Err(item.error(e));
    }
  }

  static async update(
    id: number,
    payload: ItemUpdate
  ): Promise<Result<Item, ApiError>> {
    try {
      const response = await api.patch<Item>(`/items/${id}`, payload);
      return Ok(response.data);
    } catch (e) {
      return Err(item.error(e));
    }
  }

  static async delete(
    id: number,
    force: boolean = false
  ): Promise<Result<ItemDeleteResponse, ApiError>> {
    try {
      const url = `/items/${id}?force=${force}`;
      const response = await api.delete<ItemDeleteResponse>(url);
      return Ok(response.data);
    } catch (e) {
      return Err(item.error(e));
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