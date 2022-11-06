import SocialModule from './SocialModule'
import type { ISocialRegex, Social } from '~/types/social'

export default class SocialLinkedin extends SocialModule {
  type: Social = 'linkedin'
  regex = /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/([a-zA-Z0-9]+)/ig

  public make(): ISocialRegex {
    const id = this.matches[2] ?? undefined

    return {
      url: this.matches[0] ?? undefined,
      user: this.matches[1] ?? undefined,
      id,
    }
  }
}
