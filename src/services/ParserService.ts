import * as cheerio from 'cheerio'
import puppeteer from 'puppeteer'
import type { MetaNode, MetaValues } from '~/types/html'
import type { FetchResponse } from '~/types/http'
import type { FetchMeta, QueryOpenGraph } from '~/types/route'
import Http from '~/utils/Http'

interface MetaNodeEl {
  name: string
  attrs: MetaNode[]
}

interface IParserMeta {
  response: FetchResponse
  fetchMeta: FetchMeta
  metaValues?: Record<string, any>
}

type ParserType = 'cheerio' | 'puppeteer'
interface IParserType<T> {
  cheerio: T
  puppeteer: T
}

export default class ParserService {
  protected constructor(
    protected url: string,
    protected parserType: ParserType = 'cheerio',
    protected type: QueryOpenGraph = 'all'
  ) {}

  public static async make(url: string, parserType: ParserType = 'cheerio', type: QueryOpenGraph = 'all'): Promise<IParserMeta> {
    const service = new ParserService(url, parserType, type)

    const parsers: IParserType<() => Promise<IParserMeta>> = {
      cheerio: () => service.parseCheerio(),
      puppeteer: () => service.parsePuppeteer(),
    }
    const current = parsers[parserType]
    const parser = await current()

    return parser
  }

  private async parseCheerio(): Promise<IParserMeta> {
    const http = Http.client(this.url)
    const res = await http.get<string>()

    const response: FetchResponse = res
    const fetchMeta: FetchMeta = {
      message: res.statusText,
      ok: res.ok,
      status: res.status,
      type: res.type
    }

    if (res.type !== 'text' || !res.ok) {
      console.error('OpenGraph: Failed to fetch HTML')
      return { response, fetchMeta }
    }

    const metaValues = this.parseHtml(res.body)

    return { response, fetchMeta, metaValues }
  }

  /**
   * @see https://github.com/puppeteer/puppeteer/issues/4752
   */
  private async parsePuppeteer(): Promise<IParserMeta> {
    console.log(this)

    try {
      const options: puppeteer.PuppeteerLaunchOptions = {
        // args: ['--no-sandbox', '--disable-setuid-sandbox'],
        // headless: true,
        // timeout: 3000,
        // dumpio: true,
      }
      const browser = await puppeteer.launch(options)
      const page = await browser.newPage()
      await page.goto(this.url, { waitUntil: 'networkidle2' })

      // await page.evaluate(() => {
      //   console.log(document)
      //   // const metaNodes = document.querySelectorAll('meta')
      //   // console.log(metaNodes)
      // })
    }
    catch (error) {
      console.error(`OpenGraph: Failed to fetch HTML: ${error}`)
    }

    // await browser.close()

    // const browser = await puppeteer.launch()
    // const page = await browser.newPage()
    // await page.goto('https://medium.com/search?q=headless%20browser')

    // const scrapedData = await page.evaluate(() =>
    //   Array.from(
    //     document.querySelectorAll(
    //       'div.postArticle-content a:first-child[data-action-value]'
    //     )
    //   )
    //     .filter(node => node.querySelector('.graf--title'))
    //     .map(link => ({
    //       title: link.querySelector('.graf--title').textContent,
    //       link: link.getAttribute('data-action-value')
    //     }))
    // )

    // await browser.close()
    // console.log(scrapedData)

    const metaValues: MetaValues = {}

    return {
      response: {},
      fetchMeta: {},
      metaValues,
    }
  }

  private parseHtml(html?: string): Record<string, any> {
    const $ = cheerio.load(html ?? '')

    const meta: Record<string, any> = {}
    const metaNodes = this.type === 'all'
      ? this.metaNodes()
      : this.metaNodesTwitter()

    metaNodes.forEach(node => {
      node.attrs.forEach(attr => {
        const current = $(attr.query) // e.g. [property="og:title"]
        const type = attr.type as string // e.g. attr
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const value: object | undefined = current[type](node.value) // e.g. content
        if (value && meta[node.name] === undefined) {
          const nodeValue = value as { name?: string; content?: string }
          meta[node.name] = nodeValue?.content
        }
      })
    })

    return meta
  }

  private metaNodes(): MetaNodeEl[] {
    return [
      {
        name: 'title',
        attrs: [
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
        ]
      },
      {
        name: 'description',
        attrs: [
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
        ]
      },
      {
        name: 'image',
        attrs: [
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
        ]
      },
      {
        name: 'siteUrl',
        attrs: [
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
        ]
      },
      {
        name: 'type',
        attrs: [
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
        ]
      },
      {
        name: 'siteName',
        attrs: [
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
        ]
      },
      {
        name: 'locale',
        attrs: [
          {
            query: '[property="og:locale"]',
            type: 'attr',
            value: 'content',
          }
        ]
      },
      {
        name: 'audio',
        attrs: [
          {
            query: '[property="og:audio"]',
            type: 'attr',
            value: 'content',
          }
        ]
      },
      {
        name: 'video',
        attrs: [
          {
            query: '[property="og:video"]',
            type: 'attr',
            value: 'content',
          }
        ]
      },
      {
        name: 'determiner',
        attrs: [
          {
            query: '[property="og:determiner"]',
            type: 'attr',
            value: 'content',
          }
        ]
      },
      {
        name: 'article:author',
        attrs: [
          {
            query: '[property="og:article:author"]',
            type: 'attr',
            value: 'content',
          }
        ]
      },
      {
        name: 'themeColor',
        attrs: [
          {
            query: '[name="theme-color"]',
            type: 'attr',
            value: 'content',
          },
        ]
      },
      {
        name: 'icon',
        attrs: [
          {
            query: 'link[rel="icon"]',
            type: 'attr',
            value: 'href',
          }
        ]
      }
    ]
  }

  private metaNodesTwitter(): MetaNodeEl[] {
    const twitterMeta = [
      'twitter:card',
      'twitter:site:id',
      'twitter:site',
      'twitter:url',
      'twitter:creator',
      'twitter:creator:id',
      'twitter:description',
      'twitter:title',
      'twitter:image',
      'twitter:image:alt',
      'twitter:player',
      'twitter:player:width',
      'twitter:player:height',
      'twitter:player:stream',
      'twitter:app:name:iphone',
      'twitter:app:id:iphone',
      'twitter:app:url:iphone',
      'twitter:app:name:ipad',
      'twitter:app:id:ipad',
      'twitter:app:url:ipad',
      'twitter:app:name:googleplay',
      'twitter:app:id:googleplay',
      'twitter:app:url:googleplay',
    ]
    const meta: MetaNodeEl[] = []

    twitterMeta.forEach((metaName) => {
      meta.push({
        name: metaName,
        attrs: [
          {
            query: `[name="${metaName}"]`,
            type: 'attr',
            value: 'content',
          },
        ]
      })
    })

    return meta
  }
}
