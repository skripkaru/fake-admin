export interface PostResponse {
  posts: Post[]
  limit: number
  skip: number
  total: number
}

export interface PostParams {
  limit?: number
  skip?: number
  q?: string
  sortBy?: string
  order?: string
}

export interface Post {
  id: number
  title: string
  body: string
  tags: string[]
  reactions: {
    likes: number
    dislikes: number
  }
  views: number
  userId: number
}