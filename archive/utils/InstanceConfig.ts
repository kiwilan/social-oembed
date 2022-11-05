// import packageJson from '../../package.json'
import DotEnv from '~/utils/DotEnv'
import { route } from '~/utils/Route'
import type { Instance } from '~/types'

export default class InstanceConfig {
  public config: Instance

  protected constructor(config: Instance) {
    this.config = config
  }

  public static make(): InstanceConfig {
    const dotenv = DotEnv.make()

    const instance = new InstanceConfig({
      // name: packageJson.name,
      // version: packageJson.version,
      name: 'package',
      version: '0.0.1',
      apiKeyEnable: dotenv.config.API_KEY_ENABLED,
      instance: dotenv.config.API_URL,
      options: {
        query: {
          api_key: dotenv.config.API_KEY_ENABLED ? 'required, type string' : 'disable on this instance',
          url: 'required, type string',
          format: 'optional, type `oembed` | `opengraph`, default `oembed`',
        },
      },
      examples: {
        // TODO: add examples, add query params with `route()` helper
        opengraph: route({
          endpoint: '/api',
          query: { url: 'https://github.com', format: 'opengraph', api_key: dotenv.config.API_KEY, dark: 'false' },
        }),
      },
    })

    return instance
  }
}
