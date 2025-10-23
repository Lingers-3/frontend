import axios, { AxiosError } from "axios";
import api from "~/lib/api";

export type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

export function ok<T>(value: T): Result<T, never> {
  return { ok: true, value };
}

export function err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}

export interface User {
  aud: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number;
  iss: string;
  name: string;
  nickname: string;
  picture: string;
  sid: string;
  sub: string;
  updated_at: string;
}

export interface ApiError {
  status?: number;
  message: string;
}

export class auth {
  static async me(): Promise<Result<User, ApiError>> {
    try {
      const response = await api.get<User>('/users/me');
      return ok(response.data);
    } catch (e) {
      return err(auth.error(e));
    }
  }

  static login() {
    window.location.href = 'https://pocketeer-api.linerds.us/api/auth/login';
  }

  static logout() {
    window.location.href = 'https://pocketeer-api.linerds.us/api/auth/logout';
  }

  static async password(
    newPassword: string
  ): Promise<Result<{ message: string }, ApiError>> {
    try {
      const response = await api.post<{ message: string }>(
        '/api/auth/change-password',
        { newPassword }
      );
      return ok(response.data);
    } catch (e) {
      return err(auth.error(e));
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
