import type { FastifyRequest } from 'fastify'
import type { ApiQueryFormat, ApiResponse, ApiRouteQuery, IApiQueryFormat, IApiRouteQuery, TwitterAlign, TwitterConversation, TwitterTheme } from '~/types/route'
import OpenGraph from '~/models/OpenGraph'
import OEmbed from '~/models/OEmbed'
import type { FormatResponse } from '~/types'
import { route } from '~/utils/Route'

export default class ApiService {
  protected formatResponse?: FormatResponse

  protected constructor(
    public req: FastifyRequest,
    public query: IApiRouteQuery,
  ) {}

  public static make(req: FastifyRequest): ApiService {
    const service = new ApiService(req, {
      url: 'unknown URL',
      format: 'opengraph'
    })
    service.query = service.setQuery()

    return service
  }

  private setQuery(): IApiRouteQuery {
    const query = this.req.query as ApiRouteQuery
    let apiKey: string | boolean | undefined = query?.api_key

    if (apiKey === 'undefined' || apiKey === 'null' || apiKey === 'false')
      apiKey = false

    return {
      api_key: apiKey,
      dark: query?.dark === 'true' || false,
      format: query?.format as ApiQueryFormat || 'opengraph',
      url: query?.url || 'unkown',
      align: query?.align as TwitterAlign ?? 'center',
      conversation: query?.conversation as TwitterConversation ?? 'none',
      hide_media: query?.hide_media === 'true' || false,
      lang: query?.lang ?? 'en',
      theme: query?.theme as TwitterTheme ?? 'light',
      omit_script: query?.omit_script === 'true' || false,
      width: query?.width ?? '100%',
      height: query?.height ?? '450',
      is_mobile: query?.is_mobile === 'true' || false
    }
  }

  private async getOpenGraph(): Promise<FormatResponse> {
    const og = await OpenGraph.make(this.query)

    this.formatResponse = {
      response: {
        ...og.getOpenGraph(),
        render: og.getRender()
      },
      fetchMeta: og.getFetchMeta(),
      format: 'opengraph'
    }

    return this.formatResponse
  }

  private async getOEmbed(): Promise<FormatResponse> {
    // const oembed = await OEmbed.make(this.query)

    this.formatResponse = {
      // response: {
      //   ...oembed.getModel(),
      //   render: oembed.getRender()
      // },
      // fetchMeta: oembed.getFetchMeta(),
      // format: oembed.getIsOpenGraph() ? 'opengraph' : 'oembed'
    }

    return this.formatResponse
  }

  public async get(): Promise<ApiResponse> {
    const formats: IApiQueryFormat<() => Promise<FormatResponse>> = {
      opengraph: () => this.getOpenGraph(),
      oembed: () => this.getOEmbed(),
    }

    const format = formats[this.query.format] || formats.opengraph

    if (format)
      await format()

    const message = this.query.format !== this.formatResponse?.format
      ? `Format '${this.query.format}' not supported. Using '${this.formatResponse?.format}' instead.`
      : 'N/A'

    return {
      data: this.formatResponse?.response,
      meta: {
        url: this.query.url ?? '',
        format: this.formatResponse?.format ?? 'opengraph',
        message,
        docs: route('/docs'),
        fetch: this.formatResponse?.fetchMeta ?? {}
      }
    }
  }
}
