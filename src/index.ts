import type { OpenGraph } from './Models/OpenGraph'
import ApiService from './Services/ApiService'
import OpenGraphSevice from '@/Services/OpenGraphService'

// Start a fast HTTP server from a function
console.warn(`\nServe on: http://localhost:${process.env.PORT || 3000}\n`)

Bun.serve({
  async fetch(req: Request) {
    const api = ApiService.make(req)
    let og: OpenGraph | undefined
    if (api.url)
      og = await OpenGraphSevice.make(api.url)

    const response = {
      url: api.url,
      format: api.format,
      openGraph: og,
    }

    return new Response(JSON.stringify(response), {
      headers: { 'content-type': 'application/json' },
    })
  },

  // baseURI: "http://localhost:3000",

  // this is called when fetch() throws or rejects
  error(err: Error) {
    return new Response(`uh oh! :(\n${err.toString()}`, { status: 500 })
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
