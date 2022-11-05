import SocialRegex from '~/utils/SocialRegex'
import type OpenGraphItem from '~/models/OpenGraph'
import Http from '~/utils/Http'
import type { TwitterApi } from '~/types/social'

export default class SocialServiceTwitter {
  // https://twitter.com/freekmurze/status/1588610032203087876
  protected constructor(
    protected url: string,
    protected mediaId?: string,
    protected embedUrl?: string,
    protected response?: TwitterApi,
    protected isValid = false,
  ) {}

  public static async make(url: string): Promise<SocialServiceTwitter> {
    const social = new SocialServiceTwitter(url)
    await social.fetchOembedApi()

    return social
  }

  public getMediaId = (): string | undefined => this.mediaId

  public getEmbedUrl = (): string | undefined => this.embedUrl

  public getResponse = (): TwitterApi | undefined => this.response

  public getIsValid = (): boolean => this.isValid

  public getHtml = (): string | undefined => this.response?.html

  public getIframeSrc = (): string | undefined => {
    const html = this.getHtml()
    const encoded = encodeURIComponent(html ?? '')

    return `data:text/html;charset=utf-8,${encoded}`
  }

  private async fetchOembedApi(): Promise<SocialServiceTwitter> {
    const social = SocialRegex.make(this.url)

    if (social.type !== 'twitter')
      return this

    const api = `https://publish.twitter.com/oembed?url=${this.url}`

    const params = new URLSearchParams()
    params.append('align', 'center')
    params.append('conversation', 'none')
    params.append('hide_media', 'true')
    params.append('lang', 'fr')
    params.append('theme', 'dark')
    params.append('omit_script', 'true')

    const url = `${api}?${params.toString()}`

    const client = Http.client(url)
    const res = await client.get()

    this.response = res.body as TwitterApi
    this.isValid = res.status === 200

    return this
  }
}
