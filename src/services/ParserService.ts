import * as cheerio from 'cheerio'
import puppeteer from 'puppeteer'
import type { IOpenGraph } from '~/types/api'
import type { MetaNode, MetaValues, OpenGraphMeta } from '~/types/html'
import type { FetchResponse } from '~/types/http'
import type { FetchMeta } from '~/types/route'
import Http from '~/utils/Http'

interface IParser {
  response: FetchResponse
  fetchMeta: FetchMeta
  metaValues?: MetaValues
}

type Type = 'cheerio' | 'puppeteer'
interface IType<T> {
  cheerio: T
  puppeteer: T
}

export default class ParserService {
  protected constructor(
    protected url: string,
    protected converter: Type = 'cheerio',
  ) {}

  public static async make(url: string, type: Type = 'cheerio'): Promise<IParser> {
    const service = new ParserService(url, type)

    const types: IType<() => Promise<IParser>> = {
      cheerio: () => service.parseCheerio(),
      puppeteer: () => service.parsePuppeteer(),
    }
    const current = types[type]
    const parser = await current()

    return parser
  }

  private async parseCheerio(): Promise<IParser> {
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
  private async parsePuppeteer(): Promise<IParser> {
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
