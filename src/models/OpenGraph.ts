import ApiModule from '~/models/ApiModule'
import type { IOpenGraph } from '~/types/api'
import type { ApiRouteQueryFormat } from '~/types/route'
import type { MetaValues } from '~/types/html'
import OEmbedService from '~/services/OEmbedService'
import SocialService from '~/services/SocialService'
import type OEmbedModule from '~/services/interfaces/OEmbedModule'
import type { ISocial, Social } from '~/types/social'
import ParserService from '~/services/ParserService'

export default class OpenGraph extends ApiModule {
  public model: IOpenGraph = {}

  public static async make(query: ApiRouteQueryFormat): Promise<OpenGraph> {
    const og = new OpenGraph(query)

    if (!og.query.url) {
      console.error('OpenGraph: No URL provided')
      return og
    }

    og.social = SocialService.find(og.query.url)

    const formats: ISocial<() => Promise<any>> = {
      // spotify: () => og.getOembed(og.social),
      twitter: () => og.getOembed(og.social),
      tiktok: () => og.getOembed(og.social),
    }

    const current = formats[og.social]
    if (current)
      await current()
    else
      await og.getOpenGraph(og.query.url)

    // fallback cause by API limit
    if (og.model.title === undefined)
      await og.getOpenGraph(og.query.url)

    return og
  }

  private async getOembed(social: Social): Promise<OEmbedModule | undefined> {
    const oembed = await OEmbedService.make(this.query, social)
    if (oembed) {
      this.model = oembed.toOpenGraph()
      this.fetchMeta = oembed.getFetchMeta()
    }

    return oembed
  }

  private convertHtml(metaValues: MetaValues) {
    this.model = {
      title: metaValues.title,
      description: metaValues.description,
      image: metaValues.image,
      siteUrl: metaValues.siteUrl,
      type: metaValues.type,
      siteName: metaValues.siteName,
      locale: metaValues.locale,
      themeColor: metaValues.themeColor,
      social: this.social,
      icon: metaValues.icon,
    }

    this.model.siteUrl = this.checkUrl(this.model.siteUrl)
    this.model.icon = this.checkUrl(this.model.icon)
    this.model.image = this.checkImage()
  }

  private async getOpenGraph(url: string): Promise<OpenGraph> {
    const parser = await ParserService.make(url)

    this.response = parser.response
    this.fetchMeta = parser.fetchMeta
    this.convertHtml(parser.metaValues ?? {})

    return this
  }

  private checkUrl(url?: string): string | undefined {
    let format: URL

    if (!url)
      return url

    try {
      format = new URL(url)
    }
    catch (error) {
      format = new URL(this.query.url ?? '')
    }

    let current = format.href
    current = current.replace(/\/$/, '')

    return current
  }

  private checkImage(): string | undefined {
    let image = this.model.image

    if (image && image.startsWith('/'))
      image = `${this.model.siteUrl}${image}`

    image = this.cleanUrl(image)

    return image
  }

  private cleanUrl(url?: string): string | undefined {
    return url ? url.replace('//', '/') : undefined
  }
}
