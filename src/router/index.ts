import home from './home'
import docs from './docs'
import api from './api'
import type { Endpoint, Route, RouteQuery } from '@/types'

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
        url.searchParams.append(key, current.query[key])
    })
  }

  return url.toString()
}

/**
 * Create a `Route` from `Request`
 */
export const routeBuilder = (req: Request): Route => {
  const url = req.url.replace(process.env.BASE_URL, '').replace(/\/$/, '')
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
    if (queryObject)
      queryObject[key] = value
  })
  route.query = queryObject as RouteQuery

  return route
}

/**
 * Application main router
 */
export const router = {
  home: () => home(),
  api: (req: Request) => api(req),
  docs: (req: Request) => docs(req),
}
