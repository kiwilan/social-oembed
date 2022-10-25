// import type { OpenGraph } from '@/Models/OpenGraph'
import ApiService from '@/Services/ApiService'
import type { RouteResponse } from '@/types'
// import OpenGraphSevice from '@/Services/OpenGraphService'

const docs = async (req: Request): Promise<RouteResponse> => {
  const api = ApiService.make(req)

  return {
    response: api.service,
  }
}

export default docs
