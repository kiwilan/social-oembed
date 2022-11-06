import SocialModule from './SocialModule'
import type { ISocialRegex, Social } from '~/types/social'

export default class SocialReddit extends SocialModule {
  type: Social = 'reddit'
  regex = /(?:https?:\/\/)?(?:www\.)?reddit\.com\/r\/([a-zA-Z0-9]+)/ig

  public make(): ISocialRegex {
    const id = this.matches[2] ?? undefined

    return {
      url: this.matches[0] ?? undefined,
      user: this.matches[1] ?? undefined,
      id,
    }
  }
}
