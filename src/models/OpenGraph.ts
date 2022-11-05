import * as cheerio from 'cheerio'
import TwitterOEmbed from './TwitterOEmbed'
import Http from '~/utils/Http'
import ApiModule from '~/models/ApiModule'
import type { IOpenGraph } from '~/types/api'
import type { ApiRouteQueryFormat } from '~/types/route'
import type { Meta, MetaNode, MetaValues } from '~/types'

export default class OpenGraph extends ApiModule {
  public model: IOpenGraph = {}

  public static async make(query: ApiRouteQueryFormat): Promise<OpenGraph> {
    const og = new OpenGraph(query)
    if (!og.query.url)
      return og

    if (og.query.url.includes('twitter')) {
      const twitter = await TwitterOEmbed.make(query)
      og.model = twitter.getModel()
      og.fetchMeta = twitter.getFetchMeta()
    }
    else {
      const http = Http.client(og.query.url)
      const res = await http.get()
      og.response = res

      if (res.type !== 'text')
        return og

      const metaValues = og.parseHtml(res.body)
      og.convertHtml(metaValues)
      og.fetchMeta = {
        message: res.statusText,
        ok: res.ok,
        status: res.status,
        type: res.type
      }
    }

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
      twitter: false,
    }

    this.model.siteUrl = this.checkUrl()
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

  private checkUrl(): string {
    let url: URL

    if (!this.model.siteUrl)
      return this.query.url ?? ''

    try {
      url = new URL(this.model.siteUrl)
    }
    catch (error) {
      url = new URL(this.query.url ?? '')
    }

    let current = url.href
    current = current.replace(/\/$/, '')

    return current
  }

  private checkImage(): string | undefined {
    const image = this.model.image

    if (image && image.startsWith('/'))
      return `${this.model.siteUrl}${image}`

    return this.model.image
  }

  private metaNodes(): Meta {
    return {
      title: [
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
      description: [
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
      image: [
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
      siteUrl: [
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
      type: [
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
      siteName: [
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
      locale: [
        {
          query: '[property="og:locale"]',
          type: 'attr',
          value: 'content',
        },
      // TODO meta locale
      ],
      themeColor: [
        {
          query: '[name="theme-color"]',
          type: 'attr',
          value: 'content',
        },
      ],
    }
  }
}
