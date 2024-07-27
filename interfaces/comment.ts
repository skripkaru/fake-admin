export interface CommentResponse {
  comments: Comment[]
  limit: number
  skip: number
  total: number
}

export interface CommentParams {
  limit?: number
  skip?: number
}

export interface Comment {
  id: number
  body: string
  postId: number
  likes: number
  user: {
    id: number
    username: string
    fullName: string
  }
}