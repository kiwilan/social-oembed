import SocialModule from './SocialModule'
import type { ISocialRegex, Social } from '~/types/social'

export default class SocialInstagram extends SocialModule {
  type: Social = 'instagram'
  regex = /(?:https?:\/\/)?(?:www\.)?instagram\.com\/p\/([a-zA-Z0-9]+)/ig

  public make(): ISocialRegex {
    const id = this.matches[2] ?? undefined

    return {
      url: this.matches[0] ?? undefined,
      user: this.matches[1] ?? undefined,
      id,
    }
  }
}
