import ProviderModule from '~/providers/social/ProviderModule'
import type { OEmbedApi } from '~/types/oembed'
import type { ISocialIdentifier, IframeSize, ProviderPublish, Social } from '~/types/social'

/**
 * @see https://developer.twitter.com/en/docs/twitter-for-websites/oembed-api
 * Limitations: requests
 */
export default class ProviderSpotify extends ProviderModule {
  protected init(): ProviderPublish {
    return {
      social: 'spotify' as Social,
      regex: /^(https:\/\/open.spotify.com\/|user:track:album:artist:playlist:)([a-zA-Z0-9]+)(.*)$/mg,
      endpoint: 'https://open.spotify.com/oembed',
      iframe: { height: 152, width: '100%' },
    }
  }

  protected setIdentifiers(): ISocialIdentifier {
    const id = this.params.matches[3] ? this.params.matches[3].replace('/', '') : undefined
    const type = this.params.matches[2] ?? 'track'
    const embedUrl = id ? `https://open.spotify.com/embed/${type}/${id}?` : undefined

    return {
      url: this.params.matches[0] ?? undefined,
      type,
      id,
      embedUrl
    }
  }

  protected async setResponse(): Promise<this> {
    this.module.apiParams = {
      url: this.params.query.url,
      utm_source: 'generator',
      theme: '0',
    }

    const body = await this.fetchApi<OEmbedApi>()
    // this.convertOEmbedApi(body)

    return this
  }
}
