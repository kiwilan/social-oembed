import * as cheerio from 'cheerio'
import type { MetaNode, MetaValues } from '@/types/Meta'
import { metaNodes } from '@/constants'

export class OpenGraph {
  public originalUrl: string
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
    const metaValues = og.parseHtml(body)
    og.setOpenGraph(metaValues)

    return og
  }

  protected setOpenGraph(metaValues: MetaValues) {
    this.title = metaValues.title
    this.description = metaValues.description
    this.image = metaValues.image
    this.siteUrl = metaValues.siteUrl
    this.type = metaValues.type
    this.siteName = metaValues.siteName
    this.locale = metaValues.locale
    this.themeColor = metaValues.themeColor
  }

  protected parseHtml(html: string): MetaValues {
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

  protected async fetchUrl() {
    try {
      const res = await fetch(this.originalUrl)
      return await res.text()
    }
    catch (error) {
      console.log(error)
    }
  }
}
