import type { IOpenGraph } from '~/types/api'
import type { ApiRouteQueryFormat, FetchMeta } from '~/types/route'
import type { SocialOEmbed } from '~/types/social'
import Http from '~/utils/Http'

export default abstract class OEmbedModule<T> {
  protected query: ApiRouteQueryFormat
  protected response?: T
  protected openGraph?: IOpenGraph
  protected fetchMeta?: FetchMeta
  protected params: Record<string, string> = {}
  protected html?: string

  public constructor(query: ApiRouteQueryFormat) {
    this.query = query
  }

  abstract type: SocialOEmbed
  abstract endpoint: string
  public abstract make(): Promise<OEmbedModule<T>>

  protected async fetch(): Promise<T | undefined> {
    const params = new URLSearchParams()
    for (const param of Object.entries(this.params))
      params.append(param[0], param[1])

    const url = `${this.endpoint}?${params.toString()}`

    const client = Http.client(url)
    const res = await client.get<T>()

    this.fetchMeta = {
      message: res.statusText,
      status: res.status,
      ok: res.ok,
      type: res.type,
    }

    return res.body
  }

  public toIframeSrc = (): string | undefined => {
    const encoded = encodeURIComponent(this.html ?? '')

    return this.html ? `data:text/html;charset=utf-8,${encoded}` : undefined
  }

  public toOpenGraph(): IOpenGraph {
    return this.openGraph ?? {}
  }

  public getFetchMeta(): FetchMeta {
    return this.fetchMeta ?? {}
  }
}
