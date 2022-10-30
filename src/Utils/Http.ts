import type { FetchOptions, FetchParams, FetchResponse, FetchType, ResponseMethod } from '@/types/http'

export default class Http {
  protected url: string
  protected options: FetchOptions
  protected response?: FetchResponse

  protected constructor(url: string, options: FetchOptions) {
    this.url = url
    this.options = options
  }

  public static client(url: string, options?: FetchOptions): Http {
    if (!options) {
      options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Encoding': 'gzip',
        },
      }
    }

    const http = new Http(url, options)

    return http
  }

  public async get(params?: FetchParams): Promise<FetchResponse> {
    return await this.setResponse('GET', params)
  }

  public async post(params?: FetchParams): Promise<FetchResponse> {
    return await this.setResponse('POST', params)
  }

  public async patch(params?: FetchParams): Promise<FetchResponse> {
    return await this.setResponse('PATCH', params)
  }

  public async put(params?: FetchParams): Promise<FetchResponse> {
    return await this.setResponse('PUT', params)
  }

  public async delete(params?: FetchParams): Promise<FetchResponse> {
    return await this.setResponse('DELETE', params)
  }

  /**
   * Fetch URL with `fetch` API, handle errors.
   */
  private async setResponse(method: ResponseMethod = 'GET', params?: FetchParams): Promise<FetchResponse> {
    const url = params?.url || this.url
    const body = params?.body || this.options.body

    const options = this.options
    options.method = method
    options.body = body

    const response: FetchResponse = await fetch(url, options)
      .then(async (res) => {
        let data: string | unknown

        const isText = res.headers.get('content-type')?.includes('text/html')
        const isJson = res.headers.get('content-type')?.includes('application/json')
        let type: FetchType = 'unknown'

        if (isJson) {
          data = await res.json()
          type = 'json'
        }

        if (isText) {
          data = await res.text()
          type = 'text'
        }

        return {
          body: data,
          bodyUsed: res.bodyUsed,
          contentType: res.headers.get('content-type'),
          type,
          ok: res.ok,
          headers: res.headers,
          status: res.status,
          statusText: res.statusText,
          url: res.url,
        } as FetchResponse
      })
      .catch((error) => {
        return {
          body: undefined,
          bodyUsed: false,
          type: 'unknown',
          ok: false,
          headers: new Headers(),
          status: 500,
          statusText: error,
          url: this.url,
        } as FetchResponse
      })

    return response
  }

  private isResponse = (object: unknown): object is Response => {
    return Object.prototype.hasOwnProperty.call(object, 'status')
  }

  private isFetchParams = (object: unknown): object is FetchParams => {
    return Object.prototype.hasOwnProperty.call(object, 'body')
  }
}
