import axios, { type AxiosError } from "axios";
import api, { type ApiError } from "~/lib/api"; 
import { type Result, Ok, Err } from "~/lib/result"; 
import type { Tag, TagCreate, TagUpdate } from "./types";

export class tag {
  static async create(payload: TagCreate): Promise<Result<Tag, ApiError>> {
    try {
      const response = await api.post<Tag>("/tags", payload);
      return Ok(response.data);
    } catch (e) {
      return Err(tag.error(e));
    }
  }

  static async getAll(): Promise<Result<Tag[], ApiError>> {
    try {
      const response = await api.get<Tag[]>("/tags");
      return Ok(response.data);
    } catch (e) {
      return Err(tag.error(e));
    }
  }

  static async get(id: number): Promise<Result<Tag, ApiError>> {
    try {
      const response = await api.get<Tag>(`/tags/${id}`);
      return Ok(response.data);
    } catch (e) {
      return Err(tag.error(e));
    }
  }

  static async update(
    id: number,
    payload: TagUpdate
  ): Promise<Result<Tag, ApiError>> {
    try {
      const response = await api.patch<Tag>(`/tags/${id}`, payload);
      return Ok(response.data);
    } catch (e) {
      return Err(tag.error(e));
    }
  }

  static async delete(id: number): Promise<Result<null, ApiError>> {
    try {
      await api.delete(`/tags/${id}`);
      return Ok(null); 
    } catch (e) {
      return Err(tag.error(e));
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