import SocialModule from './SocialModule'
import type { ISocialRegex, Social } from '~/types/social'

export default class SocialTwitter extends SocialModule {
  type: Social = 'flickr'
  regex = /(?:https?:\/\/)?(?:www\.)?flic\.kr\/p\/([a-zA-Z0-9]+)/ig

  public make(): ISocialRegex {
    const id = this.matches[2] ?? undefined

    return {
      url: this.matches[0] ?? undefined,
      user: this.matches[1] ?? undefined,
      id,
    }
  }
}
