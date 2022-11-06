import SocialModule from './SocialModule'
import type { ISocialRegex, Social } from '~/types/social'

export default class SocialYoutube extends SocialModule {
  type: Social = 'youtube'
  // /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9]+)/ig,
  regex = /^(?:http(?:s)?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:(?:watch)?\?(?:.*&)?v(?:i)?=|(?:embed|v|vi|user|shorts)\/))([^\?&\"'>]+)/g

  public make(): ISocialRegex {
    const id = this.matches[1] ?? undefined

    return {
      url: this.matches[0] ?? undefined,
      id,
      embedUrl: id ? `https://www.youtube.com/embed/${id}` : undefined
    }
  }
}
