import type { IOpenGraph } from '~/types/api'
import type { FetchMeta, IApiRouteQuery } from '~/types/route'
import type { ISocialIdentifier, ProviderParams, ProviderPublish, Social } from '~/types/social'
import Http from '~/utils/Http'

export default abstract class ProviderModule {
  public constructor(
    protected params: ProviderParams = {
      identifiers: {},
      matches: [],
      query: { format: 'opengraph', url: '' },
      url: '',
    },
    protected module: ProviderPublish = {
      endpoint: undefined,
      iframe: undefined,
      social: 'unknown',
      apiParams: {}
    },
    protected isValid: boolean = false,
    protected fetchMeta?: FetchMeta,
    protected openGraph?: IOpenGraph,
  ) {}

  protected abstract init(): ProviderPublish
  protected abstract setIdentifiers(): ISocialIdentifier
  protected abstract setResponse(): Promise<any>

  public make(query: IApiRouteQuery) {
    this.params = this.setParams(query)
    this.module = this.init()

    return this
  }

  protected setParams(query: IApiRouteQuery): ProviderParams {
    return {
      url: query.url ?? '',
      query,
      identifiers: {},
      matches: [],
    }
  }

  protected async fetchApi<T>(): Promise<T> {
    const params = new URLSearchParams()
    for (const param of Object.entries(this.params))
      params.append(param[0], param[1])

    const url = `${this.module.endpoint}?${params.toString()}`

    const client = Http.client(url)
    const res = await client.get<T>()
    this.isValid = res.ok ?? false

    this.fetchMeta = {
      message: res.statusText,
      status: res.status,
      ok: res.ok,
      type: res.type,
    }

    return res.body as T
  }
}
