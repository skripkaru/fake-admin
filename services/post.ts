import type {Post, PostParams, PostResponse} from "~/interfaces/post";
import type {CommentResponse} from "~/interfaces/comment";
import type {ApiError} from "~/interfaces/error";
import {handleError} from "~/utils/handle-error";

export const usePostService = () => {
  const runtimeConfig = useRuntimeConfig()
  const apiUrl = runtimeConfig.public.apiBase

  const getPosts = async (params: PostParams): Promise<PostResponse> => {
    try {
      return await $fetch<PostResponse>(`${apiUrl}/posts`, {params})
    } catch (error: unknown) {
      handleError(error as ApiError)
      throw error;
    }
  }

  const getAllPosts = async () => {
    try {
      return await $fetch<PostResponse>(`${apiUrl}/posts`, {params: {limit: 0}});
    } catch (error: unknown) {
      handleError(error as ApiError);
      throw error;
    }
  }

  const getPostByUserId = async (id: string): Promise<Post> => {
    try {
      return await $fetch<Post>(`${apiUrl}/posts/user/${id}`)
    } catch (error) {
      handleError(error as ApiError)
      throw error;
    }
  }

  const getPostComments = async (id: string): Promise<CommentResponse> => {
    try {
      return await $fetch<CommentResponse>(`${apiUrl}/posts/${id}/comments`)
    } catch (error) {
      handleError(error as ApiError)
      throw error;
    }
  }

  const searchPosts = async (params: PostParams): Promise<PostResponse> => {
    try {
      return await $fetch<PostResponse>(`${apiUrl}/posts/search`, {params})
    } catch (error: unknown) {
      handleError(error as ApiError)
      throw error;
    }
  }

  return {
    getPosts,
    getAllPosts,
    getPostByUserId,
    getPostComments,
    searchPosts,
  }
}
