import ApiService from '@/Services/ApiService'
import OpenGraphSevice from '@/Services/OpenGraphService'
import type { RouteResponse } from '@/types'

const api = async (req: Request): Promise<RouteResponse> => {
  const api = ApiService.make(req)
  const response: RouteResponse = {
    content: {
      data: {},
      meta: api.meta,
    },
  }

  const rejectApiKey = ApiService.checkApiKey(api)
  if (rejectApiKey)
    return rejectApiKey

  const rejectUrl = ApiService.checkUrl(api)
  if (rejectUrl)
    return rejectUrl

  if (api.url && api.format === 'opengraph') {
    const og = await OpenGraphSevice.make(api.url)
    response.content.data = og.getOpenGraph()
    response.content.meta.fetch = og.getFetchMeta()
  }

  if (api.url && api.format === 'oembed') {
    response.content.meta.fetch.message = 'oEmbed format is not implemented yet'
    response.content.meta.fetch.ok = false
  }

  return response
}

export default api
