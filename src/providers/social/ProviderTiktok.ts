import ProviderModule from '~/providers/social/ProviderModule'
import type { IOpenGraph } from '~/types/api'
import type { OEmbedApi } from '~/types/oembed'
import type { IProviderModule, ISocialIdentifier, Social } from '~/types/social'

/**
 * @see https://developers.tiktok.com/doc/embed-videos/
 */
export default class ProviderTiktok extends ProviderModule {
  protected init(): IProviderModule {
    return {
      social: 'tiktok' as Social,
      regex: /(@[a-zA-z0-9]*|.*)(\/.*\/|trending.?shareId=)([\d]*)/gm,
      endpoint: 'https://www.tiktok.com/oembed',
      iframe: { height: 750, width: 340 },
      forceFetch: true,
    }
  }

  protected setIdentifiers(): ISocialIdentifier {
    let type = this.params.matches[2] ?? undefined
    if (type) {
      type = type.replace('/', '')
      type = type.replace('\\', '')
    }
    const id = this.params.matches[3] ?? undefined
    const embedUrl = id ? `https://www.tiktok.com/embed/${id}` : undefined

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
    }

    const body = await this.fetchApi<OEmbedApi>()

    return this.oembedApiToOpenGraph(body, {
      height: 750
    })
  }
}
