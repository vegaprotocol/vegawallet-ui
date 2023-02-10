import { ResponseError } from './model'

export class WalletClientError extends Error {
  public title: string
  public code: number

  constructor (response: ResponseError) {
    super(response.data)
    this.title = response.message
    this.code = response.code
  }
}

export class WalletHttpError extends Error {
  public code: number

  constructor (code: number, message: string) {
    super(message)
    this.code = code
  }
}