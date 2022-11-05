import SocialRegex from '~/services/ApiService/SocialRegex'
import type { IOpenGraph } from '~/types/api'
import type { ApiRouteQueryFormat, FetchMeta } from '~/types/route'
import type { TwitterApi } from '~/types/social'
import Http from '~/utils/Http'

export default class TwitterOEmbed {
  protected constructor(
    protected query: ApiRouteQueryFormat,
    protected response?: TwitterApi,
    protected model?: IOpenGraph,
    protected fetchMeta?: FetchMeta
  ) {}

  public static async make(query: ApiRouteQueryFormat): Promise<TwitterOEmbed> {
    const twitter = new TwitterOEmbed(query)
    twitter.response = await twitter.fetchOembedApi()
    twitter.model = twitter.toOpenGraph()

    return twitter
  }

  public getResponse = (): TwitterApi | undefined => this.response

  public getModel = (): IOpenGraph => this.model ?? {}

  public getFetchMeta = (): FetchMeta => this.fetchMeta ?? {}

  private async fetchOembedApi(): Promise<TwitterApi> {
    if (!this.query?.url)
      return {}

    const social = SocialRegex.make(this.query?.url)

    if (social.type !== 'twitter')
      return {}

    const api = `https://publish.twitter.com/oembed?url=${this.query.url}`

    const params = new URLSearchParams()
    params.append('align', this.query.align ?? 'center')
    params.append('conversation', this.query.conversation ?? 'none')
    params.append('hide_media', this.query.hide_media ? 'true' : 'false')
    params.append('lang', this.query.lang ?? 'en')
    params.append('theme', this.query.theme ?? 'light')
    params.append('omit_script', this.query.omit_script ? 'true' : 'false')

    const url = `${api}?${params.toString()}`

    const client = Http.client(url)
    const res = await client.get()

    this.fetchMeta = {
      message: res.statusText,
      status: res.status,
      ok: res.ok,
      type: res.type,
    }

    return res.body as TwitterApi
  }

  private toOpenGraph(): IOpenGraph {
    const html = this.response?.html
      ? this.response.html.replace(/<[^>]*>?/gm, '')
      : undefined

    const og: IOpenGraph = {
      siteName: this.response?.provider_name,
      title: this.response?.author_name,
      siteUrl: this.response?.url,
      description: html,
      themeColor: '#1DA1F2',
      twitter: true
    }

    return og
  }

  private iframeSrc = (twitter: TwitterApi): string | undefined => {
    const html = twitter.html
    const encoded = encodeURIComponent(html ?? '')

    return `data:text/html;charset=utf-8,${encoded}`
  }
}
