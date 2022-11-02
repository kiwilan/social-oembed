// // import type { OpenGraph } from '@/Models/OpenGraph'
// import type { FastifyRequest } from 'fastify'
// import ApiService from '../services/ApiService.js'
// // import OpenGraphSevice from '@/Services/OpenGraphService'

// const docs = async (req: FastifyRequest): Promise<RouteResponse> => {
//   const api = ApiService.make(req)

//   return {
//     content: {
//       data: {},
//       meta: {
//         docs: '',
//         fetch: {},
//         url: '',
//         format: 'oembed'
//       }
//     },
//     // content: {
//     //   data: api.service,
//     // },
//   }
// }

// export default docs

// import type { FastifyInstance, FastifySchema } from 'fastify'
// import type { Static } from '@sinclair/typebox'
// import { Type } from '@sinclair/typebox'
// import type { ResponseContent } from '~/types'
// import ajv from 'ajv'
// import fastJson from 'fast-json-stringify'
// import type { RouteResponse } from '~/types'

// interface RouteResponse {
//   data: string
//   meta: string
// }

// interface Query {
//   url: string
//   format: string
// }

// interface HeadersSchemaInterface {
//   'x-forwarded-for': string
//   'x-forwarded-proto': string
//   'x-forwarded-port': string
// }

// export const User = Type.Object({
//   data: Type.Object({
//     data: Type.String(),
//     meta: Type.String()
//   }),
// mail: Type.Optional(Type.String({ format: 'email' })),
// })

// export type UserType = Static<typeof User>

// const docs = async (fastify: FastifyInstance) => {
// const opts: RouteShorthandOptions = {
//   schema: {
//     response: {
//       // 200: Type.Object({
//       //   hello: Type.Unsafe<RouteResponse>
//       // }),
//     }
//   }
// }

// const stringify = fastJson(opts, {
//   schema: { ... },
//   ajv: { ... },
//   rounding: 'ceil'
// })

// fastify.get('/docs', opts, async () => {
//   return {
//     hello: 'world',
//     data: {}
//   }
// })
// const opts: RouteShorthandOptions = {
//   schema: {
//     body: User,
//     response: {
//       200: User
//     },
//   },
// }

// fastify.get<{ Body: UserType; Reply: UserType }>(
//   '/docs', opts, (request, reply) => {
//     // The `name` and `mail` types are automatically inferred
//     const { name, mail } = request.body
//     reply.status(200).send({ name, mail })
//   }
// )

// const opts: RouteShorthandOptions = {
//   schema: {
//     response: {
//       200: User
//     },
//   },
// }

//   fastify.get<{
//     Body: number
//     Params: number
//     Querystring: Query
//     Headers: HeadersSchemaInterface
//   }>('/docs', {
//     schema: {
//       response: {
//         // 200: User
//         name: 'string',
//         age: { type: 'number', min: 18, max: 99 },
//         category: 'string[]',
//       },
//     },
//   }, (request) => {
//     // The `name` and `mail` types are automatically inferred
//     console.log(request.body)
//     console.log(request.params)
//     console.log(request.query)

//     // reply.status(200).send({ name, mail })

//     return {
//       data: {
//         data: '',
//         meta: ''
//       }
//     }
//   })

//   const schema: FastifySchema = {
//     response: {
//       200: {
//         data: Type.Object({}),
//         meta: Type.Object({
//           url: Type.String(),
//           format: Type.Union([
//             Type.Literal('oembed'),
//             Type.Literal('opengraph')
//           ]),
//           docs: Type.String(),
//           fetch: Type.Object({
//             ok: Type.Boolean(),
//             status: Type.Number(),
//             message: Type.String(),
//             type: Type.Union([
//               Type.Literal('text'),
//               Type.Literal('json'),
//               Type.Literal('unknown')
//             ])
//           }),
//         })
//       }
//     }
//   }

//   fastify.route({
//     method: 'GET',
//     url: '/docs',
//     schema,
//     async handler(req, res) {
//       console.log(req)
//       console.log(res)

//       return {
//         data: {},
//         meta: {
//           url: '',
//           format: 'opengraph',
//           docs: '',
//           fetch: {
//             message: '',
//             ok: true,
//             status: 200,
//             type: 'unknown'
//           }
//         }
//       } as ResponseContent
//     },
//   })

// export default docs
