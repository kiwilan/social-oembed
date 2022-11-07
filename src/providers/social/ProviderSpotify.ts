import ProviderModule from '~/providers/social/ProviderModule'
import type { OEmbedApi } from '~/types/oembed'
import type { ISocialIdentifier, IframeSize, Social } from '~/types/social'

/**
 * @see https://developer.twitter.com/en/docs/twitter-for-websites/oembed-api
 * Limitations: requests
 */
export default class ProviderSpotify extends ProviderModule {
  protected type: Social = 'spotify'
  // /(?:https?:\/\/)?(?:www\.)?open\.spotify\.com\/(track|album|artist)\/([a-zA-Z0-9]+)/ig
  protected regex = /^(https:\/\/open.spotify.com\/|user:track:album:artist:playlist:)([a-zA-Z0-9]+)(.*)$/mg
  protected endpoint = 'https://open.spotify.com/oembed'
  protected iframeSize: IframeSize = { height: 152, width: '100%' }

  protected providerMatch(): ISocialIdentifier {
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

  protected async providerApi(): Promise<this> {
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
