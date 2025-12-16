import axios, { type AxiosError } from "axios";
import api, { type ApiError } from "~/lib/api";
import { type Result, Ok, Err } from "~/lib/result";
import type { Picture } from "./types";

export class picture {
  static async upload(file: File): Promise<Result<Picture, ApiError>> {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await api.post<Picture>("/pictures", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return Ok(response.data);
    } catch (e) {
      return Err(picture.error(e));
    }
  }

  static async meta(id: number): Promise<Result<Picture, ApiError>> {
    try {
      const response = await api.get<Picture>(`/pictures/${id}`);
      return Ok(response.data);
    } catch (e) {
      return Err(picture.error(e));
    }
  }

  static async delete(id: number): Promise<Result<void, ApiError>> {
    try {
      await api.delete(`/pictures/${id}`);
      return Ok(undefined);
    } catch (e) {
      return Err(picture.error(e));
    }
  }

  static url(hash: string | null): string | null {
    if (!hash) return null;
    return `${import.meta.env.VITE_BASE_API_URL}/pictures/static/${hash}`;
  }

  static error(err: unknown): ApiError {
    if (axios.isAxiosError(err)) {
      const axiosError = err as AxiosError<{
        error?: string;
        message?: string;
      }>;

      return {
        status: axiosError.response?.status,
        message:
          axiosError.response?.data?.message ||
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
