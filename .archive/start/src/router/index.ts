// // import type { NowRequestHandler } from 'fastify-now'
// // import { Type } from '@sinclair/typebox'
import type { FastifyInstance, RouteShorthandOptions } from 'fastify'

// // export const GET: NowRequestHandler = async function () {
// //   return { hello: 'world' }
// // }

// // GET.opts = {
// //   schema: {
// //     response: {
// //       200: Type.Object({
// //         hello: Type.String(),
// //       }),
// //     },
// //   },
// // }

// import home from './home.js'
// import docs from './docs.js'
// import api from './api.js'
// import type { Endpoint, Route, RouteQuery } from '@/types'

/**
 * Check if current `object` is `Route`
 */
// const isRoute = (object: unknown): object is Route => {
//   return Object.prototype.hasOwnProperty.call(object, 'endpoint')
// }

/**
 * Create an url from `Endpoint` or `Route`
 */
// export const route = (route: Endpoint | Route): string => {
//   let current: Route
//   if (!isRoute(route))
//     current = { endpoint: route }
//   else
//     current = route

//   const url = new URL(current.endpoint, process.env.BASE_URL)

//   if (current.query) {
//     Object.keys(current.query).forEach((key) => {
//       if (current.query)
//         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//         // @ts-expect-error
//         url.searchParams.append(key, current.query[key])
//     })
//   }

//   return url.toString()
// }

/**
 * Create a `Route` from `Request`
 */
// export const routeBuilder = (req: FastifyRequest): Route => {
//   const url = req.url.replace(process.env.BASE_URL, '').replace(/\/$/, '')
//   let route: Route = { endpoint: '/' }

//   const splitted = url.split('?')
//   if (splitted.length === 1) {
//     route = { endpoint: splitted[0] as Endpoint }
//     return route
//   }

//   route.endpoint = splitted[0] as Endpoint

//   // get query params
//   const query = splitted[1]
//   const params = new URLSearchParams(query)
//   const queryObject = {}
//   params.forEach((value, key) => {
//     if (queryObject) {
//       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//       // @ts-expect-error
//       queryObject[key] = value
//     }
//   })
//   route.query = queryObject as RouteQuery

//   return route
// }

/**
 * Application main router
 */
// export const router = {
//   home: () => home(),
//   api: (req: FastifyRequest) => api(req),
//   docs: (req: FastifyRequest) => docs(req),
// }

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          pong: {
            type: 'string'
          }
        }
      }
    }
  }
}

export const createRouter = (server: FastifyInstance): FastifyInstance => {
  server.get('/', opts, async () => {
    return { pong: 'it worked!' }
  })

  return server
}
