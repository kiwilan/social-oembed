import tap from 'tap'
import server from '../index.js'

tap.test('GET /', (t) => {
  t.plan(1)
  t.test('Should return hello world', async (t) => {
    const response = await server.inject({
      method: 'GET',
      path: '/',
    })
    t.match(response.statusCode, 200)
    t.match(response.json(), { hello: 'world' })
  })
})
