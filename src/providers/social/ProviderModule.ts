import { colors } from '~/renders/SocialAssets'
import type { IOpenGraph } from '~/types/api'
import type { OEmbedApi, OEmbedApiParams } from '~/types/oembed'
import type { FetchMeta, IApiRouteQuery } from '~/types/route'
import type { ISocialIdentifier, Social } from '~/types/social'
import Http from '~/utils/Http'

export default abstract class ProviderModule {
  protected query: IApiRouteQuery
  protected social: Social = 'unknown'
  protected url: string
  protected matches: string[] = []
  protected params: Record<string, string> = {}
  protected fetchMeta?: FetchMeta
  protected openGraph?: IOpenGraph
  protected html?: string
  protected identifiers: ISocialIdentifier = {}

  public constructor(query: IApiRouteQuery) {
    this.query = query
    this.url = query.url
  }

  protected abstract type: Social
  protected abstract regex: RegExp | undefined
  protected abstract endpoint: string | undefined
  protected abstract providerMatch(): ISocialIdentifier
  protected abstract providerApi(): Promise<this>

  protected async fetchOembed<T>(): Promise<T> {
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

  public getIframeSrc(): string | undefined {
    const encoded = encodeURIComponent(this.html ?? '')

    return this.html ? `data:text/html;charset=utf-8,${encoded}` : undefined
  }

  public getOpenGraph(): IOpenGraph {
    return this.openGraph ?? {}
  }

  public getFetchMeta(): FetchMeta {
    return this.fetchMeta ?? {}
  }

  public getIdentifiers(): ISocialIdentifier {
    return this.identifiers
  }

  private getColor(): string {
    return colors[this.social] ?? '#000000'
  }

  protected convertOEmbedApi(body: OEmbedApi, params?: OEmbedApiParams) {
    this.html = body?.html
    const height = (body?.height)?.toString()
    const thumbnailHeight = (body?.thumbnail_height)?.toString()

    const width = (body?.width)?.toString()
    // let thumbnailWidth = (body?.thumbnail_width)?.toString()

    const color = params?.color ? params.color : this.getColor()

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
      'themeColor': color,
      'image': body?.thumbnail_url,
      'type': body?.type,
      'social': this.type,
      'article:author': body?.author_name,
      'width': iframeWidth,
      'height': iframeHeight,
    }
  }

  private socialIdentifiers(): ISocialIdentifier {
    if (!this.regex)
      return {}

    const regExp = new RegExp(this.regex)
    const matches = this.url.matchAll(regExp)
    const raw = [...matches]
    this.matches = raw[0] ?? []
    this.social = this.type

    return this.providerMatch()
  }

  public onlyIdentifiers(): ISocialIdentifier {
    this.socialIdentifiers()
    this.identifiers = this.providerMatch()
    return this.identifiers
  }

  public async make(): Promise<ProviderModule> {
    this.onlyIdentifiers()
    await this.providerApi()

    return this
  }
}
