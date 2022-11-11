import type { FetchResponse } from '~/types/http'
import type { FetchMeta, IApiRouteQuery } from '~/types/route'
import type { Social } from '~/types/social'

export default abstract class ApiModule {
  protected query: IApiRouteQuery
  protected fetchMeta: FetchMeta
  protected render?: string
  protected isValid = false
  public response?: FetchResponse
  public social: Social = 'unknown'

  protected constructor(query: IApiRouteQuery, fetchMeta?: FetchMeta) {
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

  public getRender(): string | undefined {
    return this.render
  }
}
