import SocialModule from '~/services/interfaces/SocialModule'
import type { ISocialRegex, Social } from '~/types/social'

export default class SocialTumblr extends SocialModule {
  type: Social = 'tumblr'
  regex = /(?:https?:\/\/)?(?:www\.)?tumblr\.com\/post\/([a-zA-Z0-9]+)/ig

  public get(): ISocialRegex {
    const id = this.matches[2] ?? undefined

    return {
      url: this.matches[0] ?? undefined,
      user: this.matches[1] ?? undefined,
      id,
    }
  }
}
