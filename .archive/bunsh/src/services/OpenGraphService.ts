import { OpenGraphItem } from '@/Models/OpenGraph'

export default class OpenGraphService {
  protected url: string
  protected openGraph?: OpenGraphItem
  protected meta: any
  protected is_twitter = false

  protected constructor(url: string) {
    this.url = url
  }

  public static async make(url: string): Promise<OpenGraphItem> {
    const service = new OpenGraphService(url)

    if (url.includes('twitter')) {
      // let twitter = await OpenGraphTwitter.make(service.url)
      // service.openGraph = twitter.getOpenGraph()
      service.is_twitter = true
    }

    // TODO twitter webpage into website settings, media lozad
    service.openGraph = await OpenGraphItem.make(service.url)

    return service.openGraph
  }
}
