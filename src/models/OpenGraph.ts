import * as cheerio from 'cheerio'
import Http from '../utils/Http'
import Module from '../models/Module'
import OpenGraphService from '../services/OpenGraphService'
import type { FetchMeta, MetaNode, MetaValues, OpenGraphResponse } from '~/types'

export default class OpenGraphItem extends Module {
  public ok = false
  public originalUrl: string
  public error?: string
  public title?: string
  public description?: string
  public image?: string
  public siteUrl?: string
  public type?: string
  public siteName?: string
  public locale?: string
  public themeColor?: string

  // docs: https://www.digitalocean.com/community/tutorials/how-to-use-classes-in-typescript
  // protected constructor(
  //   public name: string,
  //   public age: number
  // ) {}

  protected constructor(originalUrl: string, meta?: FetchMeta) {
    if (!meta) {
      meta = {
        message: 'Constructor error',
        ok: false,
        status: 500,
        type: 'unknown'
      }
    }
    super(meta)
    this.originalUrl = originalUrl
  }

  public static async make(originalUrl: string): Promise<OpenGraphItem> {
    const og = new OpenGraphItem(originalUrl)

    const http = Http.client(originalUrl)
    const res = await http.get()

    if (res.ok && res.type === 'text') {
      const metaValues = og.parseHtml(res.body)
      og.setOpenGraph(metaValues)
    }

    og.setMeta({
      message: res.type === 'text'
        ? res.statusText
        : 'Error: endpoint has `application/json` content-type',
      ok: res.type === 'text'
        ? res.ok
        : false,
      status: res.status,
      type: res.type,
    })

    return og
  }

  public getOpenGraph(): OpenGraphResponse {
    return {
      title: this.title,
      description: this.description,
      image: this.image,
      siteUrl: this.siteUrl,
      type: this.type,
      siteName: this.siteName,
      locale: this.locale,
      themeColor: this.themeColor,
    }
  }

  public getFetchMeta(): FetchMeta {
    return this.meta
  }

  private setOpenGraph(metaValues: MetaValues) {
    this.title = metaValues.title
    this.description = metaValues.description
    this.image = metaValues.image
    this.siteUrl = metaValues.siteUrl
    this.type = metaValues.type
    this.siteName = metaValues.siteName
    this.locale = metaValues.locale
    this.themeColor = metaValues.themeColor

    this.siteUrl = this.checkUrl()
    this.image = this.checkImage()
  }

  private parseHtml(html?: string): MetaValues {
    const $ = cheerio.load(html ?? '')

    const metaValues: MetaValues = {}
    Object.entries(OpenGraphService.metaNodes()).forEach((el) => {
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

    if (!this.siteUrl)
      return this.originalUrl

    try {
      url = new URL(this.siteUrl)
    }
    catch (error) {
      url = new URL(this.originalUrl)
    }

    let current = url.href
    current = current.replace(/\/$/, '')

    return current
  }

  private checkImage(): string | undefined {
    const image = this.image

    if (image && image.startsWith('/'))
      return `${this.siteUrl}${image}`

    return this.image
  }
}
