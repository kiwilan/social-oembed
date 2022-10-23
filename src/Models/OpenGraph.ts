import * as cheerio from 'cheerio'
import type { MetaNode, MetaValues } from '@/types/Meta'
import { metaNodes } from '@/constants'

export class OpenGraph {
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
    this.originalUrl = originalUrl
  }

  public static async make(originalUrl: string): Promise<OpenGraph> {
    const og = new OpenGraph(originalUrl)

    const body = await og.fetchUrl()
    if (body) {
      const metaValues = og.parseHtml(body)
      og.setOpenGraph(metaValues)
      og.ok = true
    }

    return og
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

  private async fetchUrl(): Promise<string | null> {
    const res = await fetch(this.originalUrl)
      .then(async (res) => {
        if (res && res.ok)
          return await res.text()
      })
      .catch((err) => {
        console.warn(err)
        this.error = err
        return null
      })

    return res
  }

  private checkUrl(): string {
    let url: URL

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

  private checkImage(): string {
    const image = this.image

    if (!image || image.startsWith('/'))
      return `${this.siteUrl}${image}`

    return this.image
  }
}