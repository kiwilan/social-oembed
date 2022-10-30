import type { RouteResponse } from './types'
import Cors from './Utils/Cors'
import { routeBuilder, router } from '@/router'

// Start a fast HTTP server from a function
console.warn(`\nServe on: http://localhost:${process.env.PORT || 3000}\n`)

Bun.serve({
  async fetch(req: Request) {
    // req.headers.append('Access-Control-Allow-Origin', '*')
    // req.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    // req.headers.append('Access-Control-Allow-Headers', 'Content-Type, Accept, Origin, Authorization')

    const url = routeBuilder(req)

    let route: (req: Request) => Promise<RouteResponse> = router.home
    switch (url.endpoint) {
      case '/':
        route = router.home
        break

      case '/api':
        route = router.api
        break

      case '/docs':
        route = router.docs
        break

      default:
        route = router.home
        break
    }

    const res = await route(req)
    if (res.redirect)
      return Response.redirect(res.redirect, res.status)

    // req.headers.get('host')
    const cors = Cors.make(req)

    const response = new Response(JSON.stringify(res.content), {
      headers: cors.headers,
      status: res.status || 200,
      statusText: res.status === 200 ? 'OK' : 'Not Found',
    })

    return response
  },

  baseURI: process.env.BASE_URL || 'http://localhost:3000',

  // this is called when fetch() throws or rejects
  error(err: Error) {
    return new Response(JSON.stringify({
      error: `Error ${err.toString()}`,
    }), {
      headers: { 'content-type': 'application/json' },
      status: 500,
    })
  },

  // this boolean enables bun's default error handler
  development: process.env.NODE_ENV !== 'production',
  // note: this isn't node, but for compatibility bun supports process.env + more stuff in process

  // SSL is enabled if these two are set
  // certFile: './cert.pem',
  // keyFile: './key.pem',

  port: Number(process.env.PORT ?? 3000), // number or string
})
// Start a fast HTTP server from the main file's export
// export default {
//   fetch(req) {
//     return new Response(
//       `This is another way to start a server!
//        if the main file export default's an object
//        with 'fetch'. Bun automatically calls Bun.serve`
//     );
//   },
//   // so autocomplete & type checking works
// } as Bun.Serve;
