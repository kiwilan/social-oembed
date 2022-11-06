import SocialModule from '~/services/interfaces/SocialModule'
import type { ISocialIdentifier, Social } from '~/types/social'

export default class SocialPinterest extends SocialModule {
  type: Social = 'pinterest'
  regex = /(?:https?:\/\/)?(?:www\.)?pinterest\.com\/pin\/([a-zA-Z0-9]+)/ig

  public get(): ISocialIdentifier {
    const id = this.matches[2] ?? undefined

    return {
      url: this.matches[0] ?? undefined,
      user: this.matches[1] ?? undefined,
      id,
    }
  }
}
