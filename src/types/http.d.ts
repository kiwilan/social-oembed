export type ResponseMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'
export type FetchType = 'text' | 'json' | 'unknown'
export type ResponseBody = BodyInit | null

export interface FetchOptions {
  method: ResponseMethod
  body?: ResponseBody
  headers?: HeadersInit
  credentials?: RequestCredentials
  mode?: RequestMode
  timeout?: boolean
}

export interface FetchParams {
  url?: string
  body?: ResponseBody
}

export interface FetchResponse {
  ok?: boolean
  headers?: Headers
  contentType?: string
  body?: any
  bodyUsed?: boolean
  type?: FetchType
  status?: number
  statusText?: string
  url?: string
}