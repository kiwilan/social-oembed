import SocialModule from '~/services/SocialService/SocialModule'
import type { ISocialIdentifier, Social } from '~/types/social'

export default class SocialVimeo extends SocialModule {
  type: Social = 'vimeo'
  regex = /(?:https?:\/\/)?(?:www\.)?vimeo\.com\/([a-zA-Z0-9]+)/ig

  public get(): ISocialIdentifier {
    const id = this.matches[1] ?? undefined
    const embedUrl = id ? `https://player.vimeo.com/video/${id}` : undefined

    return {
      url: this.matches[0] ?? undefined,
      id,
      embedUrl
    }
  }
}
