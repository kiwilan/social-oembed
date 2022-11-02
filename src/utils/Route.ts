import type { FastifyRequest } from 'fastify'
import type { Endpoint, Route, RouteQuery } from '~/types'

interface Request {
  url: string
}

/**
 * Check if current `object` is `Route`
 */
const isRoute = (object: unknown): object is Route => {
  return Object.prototype.hasOwnProperty.call(object, 'endpoint')
}

/**
 * Create an url from `Endpoint` or `Route`
 */
export const route = (route: Endpoint | Route): string => {
  let current: Route
  if (!isRoute(route))
    current = { endpoint: route }
  else
    current = route

  const url = new URL(current.endpoint, process.env.BASE_URL)

  if (current.query) {
    Object.keys(current.query).forEach((key) => {
      if (current.query)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        url.searchParams.append(key, current.query[key])
    })
  }

  return url.toString()
}

/**
 * Create a `Route` from `Request`
 */
export const routeBuilder = (req: FastifyRequest): Route => {
  const baseURL = process.env.BASE_URL || 'http://localhost:3001'
  const url = req.url.replace(baseURL, '').replace(/\/$/, '')
  let route: Route = { endpoint: '/' }

  const splitted = url.split('?')
  if (splitted.length === 1) {
    route = { endpoint: splitted[0] as Endpoint }
    return route
  }

  route.endpoint = splitted[0] as Endpoint

  // get query params
  const query = splitted[1]
  const params = new URLSearchParams(query)
  const queryObject = {}
  params.forEach((value, key) => {
    if (queryObject) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      queryObject[key] = value
    }
  })
  route.query = queryObject as RouteQuery

  return route
}