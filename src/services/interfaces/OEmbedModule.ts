import type { IOpenGraph } from '~/types/api'
import type { OEmbedApi } from '~/types/oembed'
import type { ApiRouteQueryFormat, FetchMeta } from '~/types/route'
import type { Social } from '~/types/social'
import Http from '~/utils/Http'

interface OEmbedApiParams {
  height?: number
  width?: number
  color?: string
}

export default abstract class OEmbedModule<T = {}> {
  protected query: ApiRouteQueryFormat
  protected response?: T
  protected openGraph?: IOpenGraph
  protected fetchMeta?: FetchMeta
  protected params: Record<string, string> = {}
  protected html?: string

  public constructor(query: ApiRouteQueryFormat) {
    this.query = query
  }

  abstract type: Social
  abstract endpoint: string
  public abstract make(): Promise<OEmbedModule<T>>

  protected async fetch(): Promise<T> {
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

    return res.body as T
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

  protected convertOEmbedApi(body: OEmbedApi, params?: OEmbedApiParams) {
    this.html = body?.html
    const height = (body?.height)?.toString()
    const thumbnailHeight = (body?.thumbnail_height)?.toString()

    const width = (body?.width)?.toString()
    // let thumbnailWidth = (body?.thumbnail_width)?.toString()

    let iframeHeight = height === '100%' ? thumbnailHeight : height
    let iframeWidth = width

    if (params?.height)
      iframeHeight = params.height.toString()

    if (params?.width)
      iframeWidth = params.width.toString()

    this.openGraph = {
      'siteName': body?.provider_name,
      'title': `${body?.title} ${body?.author_name}`,
      'siteUrl': this.query.url,
      'description': body?.html ? body.html.replace(/<[^>]*>?/gm, '') : undefined,
      'themeColor': params?.color ? params.color : '#000000',
      'image': body?.thumbnail_url,
      'type': body?.type,
      'social': this.type,
      'article:author': body?.author_name,
      'width': iframeWidth,
      'height': iframeHeight,
    }
  }
}
