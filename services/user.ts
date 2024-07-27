import type {User, UserParams, UserResponse} from "~/interfaces/user";
import type {ApiError} from "~/interfaces/error";
import {handleError} from "~/utils/handle-error";

export const useUserService = () => {
  const runtimeConfig = useRuntimeConfig()
  const apiUrl = runtimeConfig.public.apiBase

  const getUsers = async (params: UserParams): Promise<UserResponse> => {
    try {
      return await $fetch<UserResponse>(`${apiUrl}/users`, {params})
    } catch (error: unknown) {
      handleError(error as ApiError)
      throw error;
    }
  }

  const getAllUsers = async () => {
    try {
      return await $fetch<UserResponse>(`${apiUrl}/users`, {params: {limit: 0}});
    } catch (error: unknown) {
      handleError(error as ApiError);
      throw error;
    }
  }

  const getUserById = async (id: string): Promise<User> => {
    try {
      return await $fetch<User>(`${apiUrl}/users/${id}`)
    } catch (error) {
      handleError(error as ApiError)
      throw error;
    }
  }

  const searchUsers = async (params: UserParams): Promise<UserResponse> => {
    try {
      return await $fetch<UserResponse>(`${apiUrl}/users/search`, {params})
    } catch (error: unknown) {
      handleError(error as ApiError)
      throw error;
    }
  }

  const filterUsers = async (params: UserParams): Promise<UserResponse> => {
    try {
      return await $fetch<UserResponse>(`${apiUrl}/users/filter`, {params})
    } catch (error: unknown) {
      handleError(error as ApiError)
      throw error;
    }
  }

  return {
    getUsers,
    getAllUsers,
    getUserById,
    searchUsers,
    filterUsers,
  }
}
