import type { FastifyRequest } from 'fastify'
import DotEnv from '~/utils/DotEnv'

interface HeadersInit {
  [key: string]: string
}

/**
 * Cors for Bun
 */
export default class Cors {
  public allowOrigins: string[]
  public headers?: HeadersInit

  protected constructor(allowOrigins: string[]) {
    this.allowOrigins = allowOrigins
  }

  public static make(req: FastifyRequest): Cors {
    const domains = DotEnv.make().config
    const allowOrigins = domains.API_DOMAINS
    const cors = new Cors(allowOrigins)
    cors.headers = cors.setCors(req)

    return cors
  }

  private setCors(req: FastifyRequest): HeadersInit {
    const headers: HeadersInit = {
      'content-type': 'application/json',
      // 'Accept-Encoding': 'gzip',
      'Access-Control-Allow-Origin': 'null',
    }

    if (this.allowOrigins.includes('*')) {
      headers['Access-Control-Allow-Origin'] = '*'
      return headers
    }

    const origin = req.headers.origin
    let originDomain = origin
    if (originDomain)
      originDomain = originDomain.replace(/(^\w+:|^)\/\//, '')

    if (origin && originDomain && this.allowOrigins.includes(originDomain))
      headers['Access-Control-Allow-Origin'] = origin
    else
      headers['Access-Control-Allow-Origin'] = 'null'

    if (req.method === 'OPTIONS') {
      headers['Access-Control-Allow-Headers'] = 'Content-Type, Accept, Origin, Authorization'
      headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, PATCH, OPTIONS'
    }

    return headers
  }
}
