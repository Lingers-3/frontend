import type { ApiError } from "./api";

export type Result<T, E> =
  | {
      ok: true;
      value: T;
    }
  | {
      ok: false;
      error: E;
    };

export function Ok<T>(value: T): Result<T, never> {
  return { ok: true, value };
}

export function Err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}

export async function unwrap<T, U>(promise: Promise<Result<T, U>>): Promise<T> {
  const result = await promise;
  if (result.ok) {
    return result.value;
  }
  throw result.error;
}
