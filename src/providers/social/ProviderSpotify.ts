import ProviderModule from '~/providers/social/ProviderModule'
import type { IOpenGraph } from '~/types/api'
import type { OEmbedApi } from '~/types/oembed'
import type { IProviderModule, ISocialIdentifier, Social } from '~/types/social'

/**
 * @see https://developer.twitter.com/en/docs/twitter-for-websites/oembed-api
 * Limitations: requests
 */
export default class ProviderSpotify extends ProviderModule {
  protected init(): IProviderModule {
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

  protected async setResponse(): Promise<IOpenGraph> {
    this.module.apiParams = {
      url: this.params.query.url,
      utm_source: 'generator',
      theme: '0',
    }

    const body = await this.fetchApi<OEmbedApi>()

    return this.oembedApiToOpenGraph(body)
  }
}
