import SocialModule from './SocialModule'
import type { ISocialRegex, Social } from '~/types/social'

export default class SocialTiktok extends SocialModule {
  type: Social = 'tiktok'
  regex = /(@[a-zA-z0-9]*|.*)(\/.*\/|trending.?shareId=)([\d]*)/gm

  public make(): ISocialRegex {
    let type = this.matches[2] ?? undefined
    if (type) {
      type = type.replace('/', '')
      type = type.replace('\\', '')
    }
    const id = this.matches[3] ?? undefined
    // const embedUrl = id ? `https://www.tiktok.com/embed/${id}` : undefined

    return {
      url: this.matches[0] ?? undefined,
      type,
      id,
      embedUrl: 'https://www.tiktok.com/embed/7072819797184171310'
    }
  }
}
