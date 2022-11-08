import ProviderModule from '~/providers/social/ProviderModule'
import type { ISocialIdentifier, IframeSize, Social } from '~/types/social'

export default class ProviderUnknown extends ProviderModule {
  protected type: Social = 'unknown'
  protected regex = undefined
  protected endpoint: string | undefined
  protected iframeSize: IframeSize = { width: 550, height: 500 }

  protected providerMatch(): ISocialIdentifier {
    return {}
  }

  protected async providerApi(): Promise<this> {
    const body = await this.fetchOpenGraph()
    this.openGraph = body

    return Promise.resolve(this)
  }
}
