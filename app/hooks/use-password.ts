import { useMutation } from "@tanstack/react-query";
import { auth } from "~/services/auth";

export const usePassword = () =>
  useMutation({
    mutationFn: async (variables: { newPassword: string }) => {
      return await auth.password(variables.newPassword);
    },
  });
