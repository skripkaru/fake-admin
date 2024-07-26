import type {ApiError} from "~/interfaces/error";
import {ElNotification} from 'element-plus'

export function handleError(error: ApiError) {
  let errorMessage = 'An unknown error occurred.'

  if (error?.statusCode) {
    switch (error.statusCode) {
      case 404:
        errorMessage = 'Received incorrect data.'
        break
      case 500:
        errorMessage = 'Server problem.'
        break
      default:
        errorMessage = error.message || 'An unknown error occurred.'
    }
  }

  ElNotification({
    title: `Error${error.statusCode ? ` ${error.statusCode}` : ''}:`,
    message: errorMessage,
    type: 'error',
  })

  return error
}
