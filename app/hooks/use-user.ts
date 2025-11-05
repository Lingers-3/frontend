import { useQuery } from "@tanstack/react-query";
import { queryClient } from "~/root";
import { auth } from "~/services/auth";
import type { User } from "~/services/auth/types";

export const userQueryKey = ["user"] as const;

export const userQueryFn = async (): Promise<User> => {
  const result = await auth.me();
  if (result.ok) {
    return result.value;
  }
  throw new Error(result.error.message);
};

export const useUser = () =>
  useQuery({
    queryKey: userQueryKey,
    queryFn: userQueryFn,
    staleTime: 5 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    initialData: () => queryClient.getQueryData(userQueryKey) ?? undefined,
  });
