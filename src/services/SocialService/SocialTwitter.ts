import SocialModule from '~/services/interfaces/SocialModule'
import type { ISocialRegex, Social } from '~/types/social'

export default class SocialTwitter extends SocialModule {
  type: Social = 'twitter'
  // /^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status?\/(\d+)/g
  regex = /(?:https?:\/\/)?(?:www\.)?twitter\.com\/([a-zA-Z0-9]+)\/status\/([a-zA-Z0-9]+)/ig

  public make(): ISocialRegex {
    const id = this.matches[2] ?? undefined

    return {
      url: this.matches[0] ?? undefined,
      user: this.matches[1] ?? undefined,
      id,
    }
  }
}
