import axios, { AxiosError } from "axios";
import api, { type ApiError } from "~/lib/api";
import { type Result, Ok, Err } from "~/lib/result";
import type { User } from "./types";

export class auth {
  static async me(): Promise<Result<User, ApiError>> {
    try {
      const response = await api.get<User>("/users/me");
      return Ok(response.data);
    } catch (e) {
      return Err(auth.error(e));
    }
  }

  static async delete(): Promise<Result<null, ApiError>> {
    try {
      await api.delete("/users/me");
      window.location.href = "/";
      return Ok(null);
    } catch (e) {
      return Err(auth.error(e));
    }
  }

  static login() {
    const redirectUri = `${window.location.origin}/inventory`;
    window.location.href = `${import.meta.env.VITE_BASE_API_URL}/auth/login?redirect_uri=${encodeURIComponent(redirectUri)}`;
  }

  static logout() {
    window.location.href = `${import.meta.env.VITE_BASE_API_URL}/auth/logout`;
  }

  static async password(
    newPassword: string
  ): Promise<Result<{ message: string }, ApiError>> {
    try {
      const response = await api.post<{ message: string }>(
        "/auth/change-password",
        { newPassword }
      );
      return Ok(response.data);
    } catch (e) {
      return Err(auth.error(e));
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
