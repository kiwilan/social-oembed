import { route } from './Route'
import DotEnv from '~/utils/DotEnv'
import type { Instance } from '~/types'

export default class InstanceConfig {
  public config: Instance

  protected constructor(config: Instance) {
    this.config = config
  }

  public static make(): InstanceConfig {
    const dotenv = DotEnv.make()

    const instance = new InstanceConfig({
      // name: Package.name,
      // version: Package.version,
      apiKeyEnabled: dotenv.config.API_KEY_ENABLED,
      instance: dotenv.config.API_URL,
      options: {
        query: {
          api_key: dotenv.config.API_KEY_ENABLED ? 'required, type string or Bearer token' : 'disable on this instance',
          url: 'required, type string',
          format: 'optional, type `oembed` | `opengraph`, default `oembed`',
        },
      },
      examples: {
        // TODO: add examples, add query params with `route()` helper
        opengraph: {
          github: route({
            endpoint: '/api',
            query: { url: 'https://github.com', format: 'opengraph' },
          })
        },
        oembed: {
          youtube: route({
            endpoint: '/api',
            query: { url: 'https://www.youtube.com/watch?v=fXmAurh012s', format: 'oembed' },
          })
          // https://youtu.be/wIM1erbld5Q
          // https://www.youtube.com/embed/3Svs_hl897c
        },
      },
    })

    return instance
  }
}
