import SocialServiceTwitter from '~/services/SocialServiceTwitter'
import OpenGraphItem from '~/models/OpenGraph'

export default class OpenGraphTwitter {
  // https://twitter.com/freekmurze/status/1588610032203087876
  protected constructor(
    protected originUrl: string,
    protected social: SocialServiceTwitter,
    protected openGraph?: OpenGraphItem,
  ) {}

  /**
     * @see https://publish.twitter.com
     * @see https://developer.twitter.com/en/docs/twitter-for-websites/embedded-tweets/overview
     * @see https://developer.twitter.com/en/docs/twitter-for-websites/webpage-properties
     */
  public static async make(url: string): Promise<OpenGraphTwitter> {
    const social = await SocialServiceTwitter.make(url)

    const twitter = new OpenGraphTwitter(url, social)
    twitter.openGraph = twitter.setOpenGraph()

    return twitter
  }

  public getOriginUrl = (): string => this.originUrl

  public getSocial = (): SocialServiceTwitter => this.social

  public getOpenGraph = (): OpenGraphItem | undefined => this.openGraph

  public setOpenGraph(): OpenGraphItem {
    const og = new OpenGraphItem(this.originUrl)
    const response = this.social.getResponse()

    const html = response?.html
      ? response.html.replace(/<[^>]*>?/gm, '')
      : undefined

    og.siteName = response?.provider_name
    og.title = response?.author_name
    og.siteUrl = response?.url
    og.description = html
    og.themeColor = '#1DA1F2'

    return og
  }
}
