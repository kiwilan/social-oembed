import type { FastifyRequest } from 'fastify'
import type { ApiQueryFormat, ApiResponse, ApiRouteQuery, ApiRouteQueryFormat, FetchMeta, TwitterAlign, TwitterConversation, TwitterTheme } from '~/types/route'
import OpenGraph from '~/models/OpenGraph'
import Render from '~/services/ApiService/Render'
import OEmbed from '~/models/OEmbed'

export default class ApiService {
  protected constructor(
    public req: FastifyRequest,
    public query: ApiRouteQueryFormat,
  ) {}

  public static make(req: FastifyRequest): ApiService {
    const service = new ApiService(req, {
      format: 'opengraph'
    })
    service.query = service.setQuery()

    return service
  }

  private setQuery(): ApiRouteQueryFormat {
    const query = this.req.query as ApiRouteQuery
    let apiKey: string | boolean | undefined = query?.api_key

    if (apiKey === 'undefined' || apiKey === 'null' || apiKey === 'false')
      apiKey = false

    return {
      api_key: apiKey,
      dark: query?.dark === 'true',
      format: query?.format as ApiQueryFormat || 'opengraph',
      url: query?.url,
      align: query?.align as TwitterAlign ?? 'center',
      conversation: query?.conversation as TwitterConversation ?? 'none',
      hide_media: query?.hide_media === 'true' || false,
      lang: query?.lang ?? 'en',
      theme: query?.theme as TwitterTheme ?? 'light',
      omit_script: query?.omit_script === 'true' || false,
    }
  }

  public async get(): Promise<ApiResponse> {
    let data = {}
    let fetchMeta: FetchMeta = {}

    if (this.query.format === 'opengraph') {
      const og = await OpenGraph.make(this.query)
      data = {
        ...og.model,
        render: Render.openGraph(og.model, this.query.dark)
      }
      fetchMeta = og.getFetchMeta()
    }

    if (this.query.format === 'oembed') {
      const oembed = await OEmbed.make(this.query)
      data = {
        ...oembed.model,
        render: Render.oembed(oembed.model)
      }
      fetchMeta = oembed.getFetchMeta()
    }

    return {
      data,
      meta: {
        url: this.query.url ?? '',
        format: this.query.format,
        docs: '',
        fetch: fetchMeta
      }
    }
  }
}
