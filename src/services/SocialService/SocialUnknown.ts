import SocialModule from '~/services/interfaces/SocialModule'
import type { ISocialIdentifier, Social } from '~/types/social'

export default class SocialUnknown extends SocialModule {
  type: Social = 'unknown'
  regex = undefined

  public get(): ISocialIdentifier {
    console.error(`No provider found for ${this.type}`)

    return {
    }
  }
}
