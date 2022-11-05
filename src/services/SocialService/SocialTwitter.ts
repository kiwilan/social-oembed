import SocialModule from './SocialModule'
import type { ISocialRegex } from '~/types/social'

export default class SocialTwitter extends SocialModule {
  public static rexExp = /(?:https?:\/\/)?(?:www\.)?twitter\.com\/([a-zA-Z0-9]+)\/status\/([a-zA-Z0-9]+)/ig

  public make(): ISocialRegex {
    this.regexp = SocialTwitter.rexExp
    this.matches = this.setMatches()
    const id = this.matches[2] ?? undefined

    return {
      url: this.matches[0] ?? undefined,
      user: this.matches[1] ?? undefined,
      id,
    }
  }
}
