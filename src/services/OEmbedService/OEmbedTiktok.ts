import type { Social } from '~/types/social'
import OEmbedModule from '~/services/interfaces/OEmbedModule'
import type { OEmbedApi } from '~/types/oembed'

/**
 * @see https://developers.tiktok.com/doc/embed-videos/
 */
export default class OEmbedTiktok extends OEmbedModule<OEmbedApi> {
  type: Social = 'tiktok'
  endpoint = 'https://www.tiktok.com/oembed'

  public async make(): Promise<OEmbedTiktok> {
    this.params = {
      url: this.query.url ?? '',
    }

    const body = await this.fetch()
    this.convertOEmbedApi(body, {
      height: 750
    })

    return this
  }
}
