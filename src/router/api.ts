import ApiService from '@/Services/ApiService'
import OpenGraphSevice from '@/Services/OpenGraphService'
import type { RouteResponse } from '@/types'

const api = async (req: Request): Promise<RouteResponse> => {
  const api = ApiService.make(req)
  let response = {}

  if (api.apiKeyEnable && api.apiKey !== process.env.API_KEY) {
    response = {
      response: {
        ok: false,
        error: 'Invalid API key with query param `api_key`',
      },
      meta: api.meta,
    }

    return {
      response,
      status: 401,
    }
  }

  let data: object
  if (api.url && api.format === 'opengraph') {
    const og = await OpenGraphSevice.make(api.url)
    // data.ok = og.getOk()
    // data.message = og.getError()
    data = og.getOpenGraph()
  }

  if (api.url && api.format === 'oembed') {
    data = {
      ok: true,
      message: 'oEmbed format is not implemented yet',
    }
  }

  return {
    response: {
      data,
      meta: api.meta,
    },
  }
}

export default api
