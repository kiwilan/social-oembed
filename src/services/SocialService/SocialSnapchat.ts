import SocialModule from '~/services/SocialService/SocialModule'
import type { ISocialIdentifier, Social } from '~/types/social'

export default class SocialSnapchat extends SocialModule {
  type: Social = 'snapchat'
  regex = /(?:https?:\/\/)?(?:www\.)?snapchat\.com\/add\/([a-zA-Z0-9\.\-\_]+)/ig

  public get(): ISocialIdentifier {
    const id = this.matches[2] ?? undefined

    return {
      url: this.matches[0] ?? undefined,
      user: this.matches[1] ?? undefined,
      id,
    }
  }
}
