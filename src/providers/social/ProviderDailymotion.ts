import ProviderModule from '~/providers/social/ProviderModule'
import type { IOpenGraph } from '~/types/api'
import type { IProviderModule, ISocialIdentifier, Social } from '~/types/social'

/**
 * @see https://developers.dailymotion.com/news/player-api/embed-dailymotion-video-oembed/
 */
export default class ProviderDailymotion extends ProviderModule {
  protected init(): IProviderModule {
    // /(?:https?:\/\/)?(?:www\.)?(?:dai\.ly|dailymotion\.com)\/(?:video|hub)\/([a-zA-Z0-9]+)_?/i
    return {
      social: 'dailymotion' as Social,
      regex: /(?:https?:\/\/)?(?:www\.)?dai\.?ly(motion)?(?:\.com)?\/?.*(?:video|embed)?(?:.*v=|v\/|\/)([a-z0-9]+)/ig,
      endpoint: 'https://www.dailymotion.com/services/oembed',
      iframe: { width: '100%', height: 400 },
    }
  }

  protected setIdentifiers(): ISocialIdentifier {
    const id = this.params.matches[2] ?? undefined
    const embedUrl = id ? `https://www.dailymotion.com/embed/video/${id}` : undefined

    return {
      url: this.params.matches[0] ?? undefined,
      embedUrl
    }
  }

  protected async setResponse(): Promise<IOpenGraph> {
    this.module.apiParams = {
      url: this.params.query.url ?? '',
      utm_source: 'generator',
      theme: '0',
    }

    return {}
  }
}
