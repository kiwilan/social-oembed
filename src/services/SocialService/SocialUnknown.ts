import SocialModule from '~/services/interfaces/SocialModule'
import type { ISocialRegex, Social } from '~/types/social'

export default class SocialUnknown extends SocialModule {
  type: Social = 'unknown'
  regex = undefined

  public make(): ISocialRegex {
    console.error(`No provider found for ${this.type}`)

    return {
    }
  }
}
