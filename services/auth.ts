import type {User} from "~/interfaces/user";
import type {ApiError} from "~/interfaces/error";
import {handleError} from "~/utils/handle-error";

export const useAuthService = () => {
  const runtimeConfig = useRuntimeConfig()
  const apiUrl = runtimeConfig.public.apiBase

  const userLogin = async (username: string, password: string): Promise<User | null> => {
    try {
      return await $fetch<User>(`${apiUrl}/auth/login`, {
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
