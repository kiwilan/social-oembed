export default class ApiService {
  public params: URLSearchParams
  public url: string = undefined
  public format: 'oembed' | 'opengraph' = 'opengraph'

  protected constructor(url: string) {
    this.url = url
  }

  public static make(req: Request): ApiService {
    const params = ApiService.queryParams(req)
    const url = params.get('url') || undefined
    const format = params.get('format') || 'opengraph'

    const api = new ApiService(url)
    api.params = params
    api.format = format as 'oembed' | 'opengraph'

    return api
  }

  public static queryParams(req: Request): URLSearchParams {
    const queryParams = req.url.split('?')
    const query = queryParams[1] || ''
    const params = new URLSearchParams(query)

    return params
  }
}
