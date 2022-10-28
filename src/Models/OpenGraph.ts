import * as cheerio from 'cheerio'
import { Module } from './Module'
import type { FetchMeta, FetchResponse, MetaNode, MetaValues, OpenGraphResponse } from '@/types'
import { metaNodes } from '@/constants'

export class OpenGraph extends Module {
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

  protected constructor(originalUrl: string) {
    super()
    this.originalUrl = originalUrl
  }

  public static async make(originalUrl: string): Promise<OpenGraph> {
    const og = new OpenGraph(originalUrl)

    const fetch = await og.fetchUrl()

    if (fetch.ok) {
      const metaValues = og.parseHtml(fetch.text ?? '')
      og.setOpenGraph(metaValues)
    }

    og.setMeta({
      message: fetch.statusText,
      ok: fetch.ok,
      status: fetch.status,
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

  private parseHtml(html: string): MetaValues {
    const $ = cheerio.load(html)

    const metaValues: MetaValues = {}
    Object.entries(metaNodes).forEach((el) => {
      const entry = el[0] // e.g. title
      const nodes: MetaNode[] = el[1]

      nodes.forEach((node) => {
        const current = $(node.query) // e.g. [property="og:title"]
        const type = node.type as string // e.g. attr
        const value = current[type](node.value) // e.g. content

        // add into metaValues only if empty
        if (!metaValues[entry])
          metaValues[entry] = value
      })
    })

    return metaValues
  }

  private isResponse = (object: unknown): object is Response => {
    return Object.prototype.hasOwnProperty.call(object, 'status')
  }

  /**
   * Fetch URL with `fetch` API, handle errors.
   */
  private async fetchUrl(): Promise<FetchResponse> {
    const response: FetchResponse = await fetch(this.originalUrl)
      .then(async (res) => {
        const json = await res.json()
        const text = await res.text()
        return {
          body: res.body,
          bodyUsed: res.bodyUsed,
          json,
          text,
          ok: res.ok,
          headers: res.headers,
          status: res.status,
          statusText: res.statusText,
          url: res.url,
          response: res,
        }
      })
      .catch((error) => {
        return {
          body: undefined,
          bodyUsed: false,
          ok: false,
          headers: new Headers(),
          status: 500,
          statusText: error,
          url: this.originalUrl,
        }
      })

    return response
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

    if (!image || image.startsWith('/'))
      return `${this.siteUrl}${image}`

    return this.image
  }
}
