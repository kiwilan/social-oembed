import type { FastifyReply, FastifyRequest } from 'fastify'
import Dotenv from './DotEnv'

export default class Middleware {
  protected constructor(
    protected request: FastifyRequest,
    protected reply: FastifyReply,
    protected query: Record<string, string>,
    protected abort = false,
    protected message?: string,
  ) {}

  public static make(request: FastifyRequest, reply: FastifyReply) {
    const query = request.query as Record<string, string>
    const instance = new Middleware(request, reply, query)

    if (instance.request.url.startsWith('/api')) {
      instance.checkApiKey()
      instance.checkUrl()
    }

    if (instance.abort)
      reply.badRequest(instance.message)
  }

  private checkApiKey() {
    const config = Dotenv.make().config
    let key = this.query?.api_key
    const headers = this.request.headers
    let authHeader = false

    if (headers.authorization !== undefined) {
      key = headers.authorization.replace('Bearer ', '')
      authHeader = true
    }

    if (config.API_KEY_ENABLED) {
      if (key === undefined) {
        this.message = '`api_key` query or Bearer token is required.'
        this.abort = true
      }

      if (config.API_KEY !== key && key !== undefined) {
        const currentAuth = authHeader
          ? 'Bearer token'
          : '`api_key` query'
        const altAuth = authHeader
          ? '`api_key` query'
          : 'Bearer token'
        this.message = `${currentAuth} is invalid (if you want, you can use ${altAuth} too).`
        this.abort = true
      }
    }
  }

  private checkUrl() {
    if (this.query?.url === undefined) {
      this.message = '`url` query is required.'
      this.abort = true
    }
  }
}
