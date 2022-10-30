// import type { FetchOptions, FetchParams, FetchResponse, FetchType } from '@/types/http'

export default class Cors {
  public allowOrigins: string[]
  public headers?: HeadersInit

  protected constructor(allowOrigins: string[]) {
    this.allowOrigins = allowOrigins
  }

  public static make(req: Request): Cors {
    const allowOrigins = Cors.dotEnvCors()
    const cors = new Cors(allowOrigins)
    cors.headers = cors.setCors(req)

    return cors
  }

  public static dotEnvCors(): string[] {
    let domains: string[] = []
    if (process.env.API_DOMAINS)
      domains = process.env.API_DOMAINS?.split(',')

    return domains
  }

  private setCors(req: Request): HeadersInit {
    const headers: HeadersInit = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': 'null',
    }

    if (this.allowOrigins.includes('*')) {
      headers['Access-Control-Allow-Origin'] = '*'
      return headers
    }

    const origin = req.headers.get('origin')
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
