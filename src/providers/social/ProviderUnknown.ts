import ProviderModule from '~/providers/social/ProviderModule'
import type { ISocialIdentifier, Social } from '~/types/social'

export default class ProviderUnknown extends ProviderModule {
  type: Social = 'unknown'
  regex = undefined

  public get(): ISocialIdentifier {
    console.error(`No provider found for ${this.type}`)

    return {
    }
  }
}
