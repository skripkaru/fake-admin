import type {Params, User, UserResponse} from "~/interfaces/user";
import type {ApiError} from "~/interfaces/error";
import {handleError} from "~/utils/handle-error";

export const useUserService = () => {
  const runtimeConfig = useRuntimeConfig()
  const apiUrl = runtimeConfig.public.apiBase

  const getUsers = async (params: Params): Promise<UserResponse> => {
    try {
      return await $fetch<UserResponse>(`${apiUrl}/users?limit=0`, {params})
    } catch (error: unknown) {
      handleError(error as ApiError)
      throw error;
    }
  }

  const getUserById = async (id: string): Promise<User> => {
    try {
      return await $fetch<User>(`${apiUrl}/user/${id}`)
    } catch (error) {
      handleError(error as ApiError)
      throw error;
    }
  }

  return {
    getUsers,
    getUserById,
  }
}
