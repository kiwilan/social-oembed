import type { IOpenGraph } from '~/types/api'
import type { FetchMeta, IApiRouteQuery } from '~/types/route'
import type { IProviderModule, ISocialIdentifier, ProviderFetch, ProviderParams } from '~/types/social'
import type { OEmbedApi, OEmbedApiParams } from '~/types/oembed'
import Http from '~/utils/Http'
import { colors } from '~/renders/SocialAssets'
import OpenGraph from '~/models/OpenGraph'

export default abstract class ProviderModule {
  public constructor(
    public params: ProviderParams = {
      matches: [],
      query: { format: 'opengraph', url: '' },
      url: '',
      fetch: 'empty'
    },
    public module: IProviderModule = {
      endpoint: undefined,
      iframe: undefined,
      social: 'unknown',
      apiParams: {},
      type: 'oembed'
    },
    public isValid: boolean = false,
    public identifiers: ISocialIdentifier = {},
    public fetchMeta: FetchMeta = {
      message: 'No fetch action',
      ok: false,
      status: 0,
      type: 'unknown',
    },
    public openGraph: IOpenGraph = {
      siteUrl: ''
    },
    public html?: string,
  ) {}

  protected abstract init(): IProviderModule
  protected abstract setIdentifiers(): ISocialIdentifier
  protected abstract setResponse(): Promise<IOpenGraph>

  public async make(query: IApiRouteQuery, fetch: ProviderFetch = 'empty') {
    this.params = this.setParams(query, fetch)
    this.module = this.init()
    this.params.matches = this.setMatches()
    this.identifiers = this.setIdentifiers()
    this.openGraph = {
      siteUrl: this.params.url,
    }

    if (this.module.forceFetch) {
      this.openGraph = await this.setResponse()
    }
    else {
      if (this.params.fetch === 'oembed')
        this.openGraph = await this.setResponse()

      if (this.params.fetch === 'opengraph' || this.params.fetch === 'empty') {
        const og = await OpenGraph.make(this.params.query)
        this.openGraph = og.getOpenGraph()
        this.fetchMeta = og.getFetchMeta()
        this.module.type = this.params.fetch === 'opengraph'
          ? 'opengraph'
          : 'oembed'
      }
    }

    this.openGraph.isValid = this.fetchMeta.ok

    return this
  }

  protected setParams(query: IApiRouteQuery, fetch: ProviderFetch): ProviderParams {
    return {
      url: query.url ?? '',
      query,
      matches: [],
      fetch,
    }
  }

  private setMatches(): string[] {
    if (!this.module.regex)
      return []

    const regExp = new RegExp(this.module.regex)
    const matches = this.params.url.matchAll(regExp)
    const raw = [...matches]

    return raw[0] ?? []
  }

  protected async fetchApi<T>(): Promise<T> {
    const params = new URLSearchParams()
    const paramsList = Object.entries(this.module.apiParams ?? {})
    for (const param of paramsList)
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

  private getColor(): string {
    return colors[this.module.social] ?? '#000000'
  }

  protected generateIframeSrc(html?: string): string | undefined {
    const encoded = encodeURIComponent(html ?? '')

    return html ? `data:text/html;charset=utf-8,${encoded}` : undefined
  }

  protected oembedApiToOpenGraph(body: OEmbedApi, params?: OEmbedApiParams): IOpenGraph {
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

    return {
      'siteName': body?.provider_name,
      'title': `${body?.title} ${body?.author_name}`,
      'siteUrl': this.params.url,
      'description': body?.html ? body.html.replace(/<[^>]*>?/gm, '') : undefined,
      'themeColor': color,
      'image': body?.thumbnail_url,
      'type': body?.type,
      'social': this.module.social,
      'article:author': body?.author_name,
      'width': iframeWidth,
      'height': iframeHeight,
    }
  }
}
