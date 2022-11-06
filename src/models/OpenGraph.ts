import * as cheerio from 'cheerio'
import Http from '~/utils/Http'
import ApiModule from '~/models/ApiModule'
import type { IOpenGraph } from '~/types/api'
import type { ApiRouteQueryFormat } from '~/types/route'
import type { MetaNode, MetaValues, OpenGraphMeta } from '~/types/html'
import OEmbedService from '~/services/OEmbedService'
import SocialService from '~/services/SocialService'
import type OEmbedModule from '~/services/interfaces/OEmbedModule'
import type { Social } from '~/types/social'

export default class OpenGraph extends ApiModule {
  public model: IOpenGraph = {}

  public static async make(query: ApiRouteQueryFormat): Promise<OpenGraph> {
    const og = new OpenGraph(query)

    if (!og.query.url) {
      console.error('OpenGraph: No URL provided')
      return og
    }

    const social = SocialService.find(og.query.url)

    switch (social) {
      case 'twitter':
        await og.getOembed(social)
        break

      case 'tiktok':
        await og.getOembed(social)
        break

      default:
        await og.getOpenGraph(og.query.url)
        break
    }

    return og
  }

  private async getOpenGraph(url: string): Promise<OpenGraph> {
    const http = Http.client(url)
    const res = await http.get<string>()

    this.response = res

    if (res.type !== 'text' || !res.ok) {
      console.error('OpenGraph: Failed to fetch HTML')
      return this
    }

    const metaValues = this.parseHtml(res.body)
    this.convertHtml(metaValues)
    this.fetchMeta = {
      message: res.statusText,
      ok: res.ok,
      status: res.status,
      type: res.type
    }

    return this
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
      // icon: metaValues.icon,
    }

    this.model.siteUrl = this.checkUrl(this.model.siteUrl)
    this.model.icon = this.checkUrl(this.model.icon)
    this.model.image = this.checkImage()
  }

  private parseHtml(html?: string): MetaValues {
    const $ = cheerio.load(html ?? '')

    const metaValues: MetaValues = {}
    Object.entries(this.metaNodes()).forEach((el) => {
      const entry = el[0] // e.g. title
      const nodes: MetaNode[] = el[1]

      nodes.forEach((node) => {
        const current = $(node.query) // e.g. [property="og:title"]
        const type = node.type as string // e.g. attr
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const value = current[type](node.value) // e.g. content

        // add into metaValues only if empty
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        if (!metaValues[entry])
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          metaValues[entry] = value
      })
    })

    return metaValues
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

  private metaNodes(): OpenGraphMeta {
    return {
      'title': [
        {
          query: '[property="og:title"]',
          type: 'attr',
          value: 'content',
        },
        {
          query: '[name="twitter:title"]',
          type: 'attr',
          value: 'content',
        },
        {
          query: 'title',
          type: 'text',
        },
      ],
      'description': [
        {
          query: '[property="og:description"]',
          type: 'attr',
          value: 'content',
        },
        {
          query: '[name="twitter:description"]',
          type: 'attr',
          value: 'content',
        },
        {
          query: 'description',
          type: 'text',
        },
      ],
      'image': [
        {
          query: '[property="og:image"]',
          type: 'attr',
          value: 'content',
        },
        {
          query: '[name="twitter:image"]',
          type: 'attr',
          value: 'content',
        },
      ],
      'siteUrl': [
        {
          query: '[property="og:url"]',
          type: 'attr',
          value: 'content',
        },
        {
          query: '[property="twitter:url"]',
          type: 'attr',
          value: 'content',
        },
      ],
      'type': [
        {
          query: '[property="og:type"]',
          type: 'attr',
          value: 'content',
        },
        {
          query: '[name="twitter:card"]',
          type: 'attr',
          value: 'content',
        },
      ],
      'siteName': [
        {
          query: '[property="og:site_name"]',
          type: 'attr',
          value: 'content',
        },
        {
          query: '[name="twitter:site"]',
          type: 'attr',
          value: 'content',
        },
        {
          query: '[name="twitter:creator"]',
          type: 'attr',
          value: 'content',
        },
      ],
      'locale': [
        {
          query: '[property="og:locale"]',
          type: 'attr',
          value: 'content',
        },
      // TODO meta locale
      ],
      'audio': [
        {
          query: '[property="og:audio"]',
          type: 'attr',
          value: 'content',
        }
      ],
      'video': [
        {
          query: '[property="og:video"]',
          type: 'attr',
          value: 'content',
        }
      ],
      'determiner': [
        {
          query: '[property="og:determiner"]',
          type: 'attr',
          value: 'content',
        }
      ],
      'article:author': [
        {
          query: '[property="og:article:author"]',
          type: 'attr',
          value: 'content',
        }
      ],
      'themeColor': [
        {
          query: '[name="theme-color"]',
          type: 'attr',
          value: 'content',
        },
      ],
      'icon': [
        {
          query: 'link[rel="icon"]',
          type: 'attr',
          value: 'href',
        },
      ]
    }
  }
}
