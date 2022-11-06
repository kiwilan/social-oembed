import SocialModule from '~/services/interfaces/SocialModule'
import type { ISocialIdentifier, Social } from '~/types/social'

export default class SocialLinkedin extends SocialModule {
  type: Social = 'linkedin'
  regex = /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/([a-zA-Z0-9]+)/ig

  public get(): ISocialIdentifier {
    const id = this.matches[2] ?? undefined

    return {
      url: this.matches[0] ?? undefined,
      user: this.matches[1] ?? undefined,
      id,
    }
  }
}
