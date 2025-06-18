import { useMutation } from "@tanstack/react-query";
import { login } from "@/lib/services/auth";
import { LoginParams, loginResponse } from "@/types/auth.types";

export function useLogin() {
  const mutation = useMutation<loginResponse, Error, LoginParams>({
          mutationFn: login,
      });

  const loginUser = async (username: string, password: string, signal: AbortSignal) => {
    return await mutation.mutateAsync({ username, password, signal });
  };

  return { mutation, loginUser };
}
