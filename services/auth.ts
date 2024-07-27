import type {AuthUser} from "~/interfaces/auth";
import type {ApiError} from "~/interfaces/error";
import {handleError} from "~/utils/handle-error";

export const useAuthService = () => {
  const runtimeConfig = useRuntimeConfig()
  const apiUrl = runtimeConfig.public.apiBase

  const userLogin = async (username: string, password: string): Promise<AuthUser | null> => {
    try {
      return await $fetch<AuthUser>(`${apiUrl}/auth/login`, {
        method: 'POST',
        body: JSON.stringify({
          username,
          password,
        }),
      })
    } catch (error: unknown) {
      handleError(error as ApiError)
      return null
    }
  }

  return {
    userLogin,
  }
}
