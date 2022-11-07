import type { FastifyRequest } from 'fastify'
import type { ApiQueryFormat, ApiResponse, ApiRouteQuery, FetchMeta, IApiQueryFormat, IApiRouteQuery, TwitterAlign, TwitterConversation, TwitterTheme } from '~/types/route'
import OpenGraph from '~/models/OpenGraph'
import RenderService from '~/services/RenderService'
import OEmbed from '~/models/OEmbed'
import SocialService from '~/services/SocialService'

interface FormatResponse {
  response?: {
    [key: string]: any
    render: string
  }
  fetchMeta?: FetchMeta
}
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
        ...og.model,
        render: RenderService.openGraph(og.model, this.query.dark)
      },
      fetchMeta: og.getFetchMeta()
    }

    return this.formatResponse
  }

  private async getOEmbed(): Promise<FormatResponse> {
    const oembed = await OEmbed.make(this.query)

    this.formatResponse = {
      response: {
        ...oembed.model,
        render: RenderService.oembed(oembed.model)
      },
      fetchMeta: oembed.getFetchMeta()
    }

    return this.formatResponse
  }

  public async get(): Promise<ApiResponse> {
    const social = SocialService.find(this.query.url)
    if (social === 'unknown')
      this.query.format = 'opengraph'

    const formats: IApiQueryFormat<() => Promise<FormatResponse>> = {
      opengraph: () => this.getOpenGraph(),
      oembed: () => this.getOEmbed(),
    }

    const format = formats[this.query.format] || formats.opengraph

    if (format)
      await format()

    return {
      data: this.formatResponse?.response,
      meta: {
        url: this.query.url ?? '',
        format: this.query.format,
        docs: '', // TODO docs route
        fetch: this.formatResponse?.fetchMeta ?? {}
      }
    }
  }
}
