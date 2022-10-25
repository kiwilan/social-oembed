import { route } from '@/router'
import type { DotEnvConfig, Format, ResponseMeta, Service } from '@/types'
import packageJson from '~/package.json'

export default class ApiService {
  private params?: URLSearchParams
  private dotenv?: DotEnvConfig
  public url?: string
  public format: Format = 'opengraph'
  public apiKey?: string
  public apiKeyEnable = false
  public service?: Service
  public meta?: ResponseMeta

  protected constructor() {
  }

  public static make(req: Request): ApiService {
    const api = new ApiService()

    api.dotenv = api.setDotenvConfig()

    api.params = api.setQueryParams(req)
    api.url = api.params.get('url') || undefined
    api.format = api.params.get('format') as Format || 'opengraph'
    api.apiKey = api.params.get('api_key') || undefined

    api.apiKeyEnable = Boolean(api.dotenv.API_KEY_ENABLE === 'true')
    api.service = api.setService()
    api.meta = api.setMeta()

    return api
  }

  private setQueryParams(req: Request): URLSearchParams {
    const queryParams = req.url.split('?')
    const query = queryParams[1] || ''
    const params = new URLSearchParams(query)

    return params
  }

  private setDotenvConfig(): DotEnvConfig {
    return {
      PORT: process.env.PORT || '3000',
      BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
      API_KEY: process.env.API_KEY || undefined,
      API_KEY_ENABLE: process.env.API_KEY_ENABLE || 'false',
    }
  }

  private setService(): Service {
    return {
      name: packageJson.name,
      version: packageJson.version,
      apiKeyEnable: this.apiKeyEnable,
      instance: this.dotenv.BASE_URL,
      options: {
        query: {
          api_key: this.apiKeyEnable ? 'required, type string' : 'disable on this instance',
          url: 'required, type string',
          format: 'optional, type `oembed` | `opengraph`, default `oembed`',
        },
      },
      examples: {
        openGraph: `${this.dotenv.BASE_URL}?url=https://github.com&format=opengraph&api_key=${this.apiKey}`,
      },
    }
  }

  private setMeta(): ResponseMeta {
    return {
      url: this.url ? this.url : 'query param `url` is required',
      format: this.format,
      docs: route('/docs'),
    }
  }
}
