import ApiModule from '~/models/ApiModule'
import type { IOpenGraph } from '~/types/api'
import type { IApiRouteQuery } from '~/types/route'
import type { MetaValues } from '~/types/html'
import SocialService from '~/services/SocialService'
import type { ISocial } from '~/types/social'
import ParserService from '~/services/ParserService'
import { colors } from '~/renders/SocialAssets'
import type ProviderModule from '~/providers/social/ProviderModule'
import RenderService from '~/services/RenderService'

export default class OpenGraph extends ApiModule {
  protected model: IOpenGraph = {}

  public static async make(query: IApiRouteQuery): Promise<OpenGraph> {
    const og = new OpenGraph(query)

    if (!og.query.url) {
      console.error('OpenGraph: No URL provided')
      throw new Error('No URL provided')
    }

    og.social = SocialService.find(og.query.url)

    const formats: ISocial<() => Promise<ProviderModule | undefined>> = {
      // spotify: () => og.getOembed(),
      twitter: () => og.getOembed(),
      tiktok: () => og.getOembed(),
    }

    const current = formats[og.social]
    if (current) {
      await current()
      // fallback cause by API limit
      if (og.model.title === undefined)
        await og.parseOpenGraph(og.query.url)
    }
    else {
      await og.parseOpenGraph(og.query.url)
    }

    if (og.social !== 'unknown')
      og.model.themeColor = colors[og.social]

    og.checkOpenGraphValid()
    og.model.isValid = og.isValid
    og.render = og.isValid ? RenderService.openGraph(og.getOpenGraph(), og.query) : undefined

    return og
  }

  private checkOpenGraphValid() {
    if (this.fetchMeta?.ok)
      this.isValid = true
  }

  private async getOembed(): Promise<ProviderModule | undefined> {
    const oembed = await SocialService.make(this.query).getOembed()
    if (oembed) {
      this.model = oembed.getOpenGraph()
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

    this.model.siteUrl = this.checkUrl(this.model.siteUrl) ?? this.query.url
    this.model.icon = this.checkUrl(this.model.icon)
    this.model.image = this.checkImage()
  }

  public getOpenGraph(): IOpenGraph {
    return this.model
  }

  private async parseOpenGraph(url: string): Promise<OpenGraph> {
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
