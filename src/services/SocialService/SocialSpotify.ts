import SocialModule from '~/services/interfaces/SocialModule'
import type { ISocialRegex, Social } from '~/types/social'

export default class SocialSpotify extends SocialModule {
  type: Social = 'spotify'
  // /(?:https?:\/\/)?(?:www\.)?open\.spotify\.com\/(track|album|artist)\/([a-zA-Z0-9]+)/ig
  regex = /^(https:\/\/open.spotify.com\/|user:track:album:artist:playlist:)([a-zA-Z0-9]+)(.*)$/mg

  public get(): ISocialRegex {
    const id = this.matches[3] ? this.matches[3].replace('/', '') : undefined
    const type = this.matches[2] ?? 'track'
    const embedUrl = id ? `https://open.spotify.com/embed/${type}/${id}?` : undefined

    return {
      url: this.matches[0] ?? undefined,
      type,
      id,
      embedUrl
    }
  }
}
