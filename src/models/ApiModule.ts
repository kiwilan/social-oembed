import type { FetchResponse } from '~/types/http'
import type { ApiRouteQueryFormat, FetchMeta } from '~/types/route'

export default abstract class ApiModule {
  protected query: ApiRouteQueryFormat
  protected fetchMeta: FetchMeta
  protected render?: string
  protected isValid?: boolean
  public response?: FetchResponse

  protected constructor(query?: ApiRouteQueryFormat, fetchMeta?: FetchMeta) {
    this.query = query ?? { format: 'opengraph' }
    this.fetchMeta = fetchMeta ?? this.initFetchMeta()
  }

  public initFetchMeta(): FetchMeta {
    return {
      ok: false,
      status: 500,
      message: 'Error on init',
      type: 'unknown'
    }
  }

  public getFetchMeta(): FetchMeta {
    return this.fetchMeta
  }
}
