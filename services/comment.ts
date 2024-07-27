import type {CommentParams, CommentResponse} from "~/interfaces/comment";
import type {ApiError} from "~/interfaces/error";
import {handleError} from "~/utils/handle-error";

export const useCommentService = () => {
  const runtimeConfig = useRuntimeConfig()
  const apiUrl = runtimeConfig.public.apiBase

  const getComments = async (params: CommentParams): Promise<CommentResponse> => {
    try {
      return await $fetch<CommentResponse>(`${apiUrl}/comments`, {params})
    } catch (error: unknown) {
      handleError(error as ApiError)
      throw error;
    }
  }

  const getAllComments = async () => {
    try {
      return await $fetch<CommentResponse>(`${apiUrl}/comments`, {params: {limit: 0}});
    } catch (error: unknown) {
      handleError(error as ApiError);
      throw error;
    }
  }

  const getCommentById = async (id: string): Promise<Comment> => {
    try {
      return await $fetch<Comment>(`${apiUrl}/comments/${id}`)
    } catch (error) {
      handleError(error as ApiError)
      throw error;
    }
  }

  const getCommentByPostId = async (id: string): Promise<Comment> => {
    try {
      return await $fetch<Comment>(`${apiUrl}/comments/post/${id}`)
    } catch (error) {
      handleError(error as ApiError)
      throw error;
    }
  }

  return {
    getComments,
    getCommentById,
    getAllComments,
    getCommentByPostId,
  }
}
