export interface ApiError {
  statusCode?: number;
  message?: string;
  [key: string]: any;
}