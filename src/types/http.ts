import type { BodyInit, HeadersInit, RequestInfo, RequestInit } from 'node-fetch'

export type ResponseMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'
export type FetchType = 'text' | 'json' | 'unknown'
export type ResponseBody = BodyInit | null

export interface NodeFetchOptions {
  method: ResponseMethod
  body?: ResponseBody
  headers?: HeadersInit
}

export interface FetchInit {
  url: RequestInfo
  options?: NodeFetchOptions
  init?: RequestInit
}

export interface FetchOptions {
  method: ResponseMethod
  body?: BodyInit
  headers?: HeadersInit
  credentials?: RequestCredentials
  mode?: RequestMode
  timeout?: boolean
}

export interface FetchParams {
  url?: string
  body?: ResponseBody
}

export interface FetchResponse<T = {}> {
  ok?: boolean
  headers?: Headers
  contentType?: string
  body?: T
  bodyUsed?: boolean
  type?: FetchType
  status?: number
  statusText?: string
  url?: string
}
