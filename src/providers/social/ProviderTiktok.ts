import ProviderModule from '~/providers/social/ProviderModule'
import type { OEmbedApi } from '~/types/oembed'
import type { ISocialIdentifier, IframeSize, Social } from '~/types/social'

/**
 * @see https://developers.tiktok.com/doc/embed-videos/
 */
export default class ProviderTiktok extends ProviderModule {
  protected type: Social = 'tiktok'
  protected regex = /(@[a-zA-z0-9]*|.*)(\/.*\/|trending.?shareId=)([\d]*)/gm
  protected endpoint = 'https://www.tiktok.com/oembed'
  protected iframeSize: IframeSize = { height: 750, width: 340 }

  protected providerMatch(): ISocialIdentifier {
    let type = this.matches[2] ?? undefined
    if (type) {
      type = type.replace('/', '')
      type = type.replace('\\', '')
    }
    const id = this.matches[3] ?? undefined
    const embedUrl = id ? `https://www.tiktok.com/embed/${id}` : undefined

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
    }

    const body = await this.fetchOembed<OEmbedApi>()
    this.convertOEmbedApi(body, {
      height: 750
    })

    return this
  }
}
