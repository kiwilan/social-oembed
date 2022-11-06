import type { Social } from '~/types/social'
import OEmbedModule from '~/services/interfaces/OEmbedModule'
import type { OEmbedApi } from '~/types/oembed'

/**
 * @see https://developer.twitter.com/en/docs/twitter-for-websites/oembed-api
 * Limitations: requests
 */
export default class OEmbedSpotify extends OEmbedModule<OEmbedApi> {
  type: Social = 'spotify'
  endpoint = 'https://open.spotify.com/oembed'

  public async make(): Promise<OEmbedSpotify> {
    this.params = {
      url: this.query.url ?? '',
      utm_source: 'generator',
      theme: '0',
    }

    const body = await this.fetch()
    this.convertOEmbedApi(body)

    return this
  }
}
