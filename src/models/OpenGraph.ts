import ApiModule from '~/models/ApiModule'
import type { IOpenGraph } from '~/types/api'
import type { IApiRouteQuery } from '~/types/route'
import type { MetaValues } from '~/types/html'
import SocialService from '~/services/SocialService'
import type { ISocial } from '~/types/social'
import ParserService from '~/services/ParserService'
import { colors } from '~/renders/SocialAssets'
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

    const formats: ISocial<boolean> = {
      twitter: true,
      tiktok: true,
    }

    const provider = formats[og.social]

    if (provider) {
      const social = await SocialService.make(query)
      og.model = social.getOpenGraph()
      og.fetchMeta = social.getFetchMeta()
    }

    if (!provider || !og.model.isValid) {
      const instance = await og.parseOpenGraph(og.query.url)
      og.model = instance.getOpenGraph()
      og.fetchMeta = instance.getFetchMeta()
    }

    if (og.social !== 'unknown')
      og.model.themeColor = colors[og.social]

    if (og.model.title || og.model.siteUrl)
      og.isValid = true

    const render = RenderService.make(og.query)
    og.render = og.isValid
      ? render.toOpenGraph({
        og: og.getOpenGraph(),
      })
      : undefined

    return og
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
