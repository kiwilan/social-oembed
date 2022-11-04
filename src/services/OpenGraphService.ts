import OpenGraphItem from '../models/OpenGraph'
import type { Meta } from '~/types'

export default class OpenGraphService {
  protected url: string
  protected openGraph?: OpenGraphItem
  protected meta: any
  protected is_twitter = false

  protected constructor(url: string) {
    this.url = url
  }

  public static async make(url: string): Promise<OpenGraphItem> {
    const service = new OpenGraphService(url)

    if (url.includes('twitter')) {
      // let twitter = await OpenGraphTwitter.make(service.url)
      // service.openGraph = twitter.getOpenGraph()
      service.is_twitter = true
    }

    // TODO twitter webpage into website settings, media lozad
    service.openGraph = await OpenGraphItem.make(service.url)

    return service.openGraph
  }

  public static metaNodes(): Meta {
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
