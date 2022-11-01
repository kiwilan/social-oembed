// import type { OpenGraph } from '@/Models/OpenGraph'
import type { FastifyRequest } from 'fastify'
import ApiService from '../services/ApiService.js'
import type { RouteResponse } from '~/types'
// import OpenGraphSevice from '@/Services/OpenGraphService'

const docs = async (req: FastifyRequest): Promise<RouteResponse> => {
  const api = ApiService.make(req)

  return {
    content: {
      data: api.service,
    },
  }
}

export default docs
