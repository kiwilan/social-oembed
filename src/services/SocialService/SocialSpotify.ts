import SocialModule from '~/services/interfaces/SocialModule'
import type { OEmbedApi } from '~/types/oembed'
import type { ISocialIdentifier, Social } from '~/types/social'

export default class SocialSpotify extends SocialModule {
  protected type: Social = 'spotify'
  // /(?:https?:\/\/)?(?:www\.)?open\.spotify\.com\/(track|album|artist)\/([a-zA-Z0-9]+)/ig
  protected regex = /^(https:\/\/open.spotify.com\/|user:track:album:artist:playlist:)([a-zA-Z0-9]+)(.*)$/mg
  protected endpoint = 'https://open.spotify.com/oembed'

  protected parseMatches(): ISocialIdentifier {
    const id = this.matches[3] ? this.matches[3].replace('/', '') : undefined
    const type = this.matches[2] ?? 'track'
    const embedUrl = id ? `https://open.spotify.com/embed/${type}/${id}?` : undefined
    this.identifiers = {
      url: this.matches[0] ?? undefined,
      type,
      id,
      embedUrl
    }

    return this.identifiers
  }

  protected async fetchApi(): Promise<this> {
    this.params = {
      url: this.query.url ?? '',
      utm_source: 'generator',
      theme: '0',
    }

    const body = await this.fetchOembed<OEmbedApi>()
    this.convertOEmbedApi(body)

    return this
  }
}
