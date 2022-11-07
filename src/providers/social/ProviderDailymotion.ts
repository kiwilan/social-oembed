import ProviderModule from '~/providers/social/ProviderModule'
import type { OEmbedApi } from '~/types/oembed'
import type { ISocialIdentifier, Social } from '~/types/social'

/**
 * @see https://developers.dailymotion.com/news/player-api/embed-dailymotion-video-oembed/
 */
export default class ProviderDailymotion extends ProviderModule {
  protected type: Social = 'dailymotion'
  // /(?:https?:\/\/)?(?:www\.)?(?:dai\.ly|dailymotion\.com)\/(?:video|hub)\/([a-zA-Z0-9]+)_?/i
  protected regex = /(?:https?:\/\/)?(?:www\.)?dai\.?ly(motion)?(?:\.com)?\/?.*(?:video|embed)?(?:.*v=|v\/|\/)([a-z0-9]+)/ig
  protected endpoint = 'https://www.dailymotion.com/services/oembed'

  protected providerMatch(): ISocialIdentifier {
    const id = this.matches[2] ?? undefined
    const embedUrl = id ? `https://www.dailymotion.com/embed/video/${id}` : undefined

    return {
      url: this.matches[0] ?? undefined,
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
