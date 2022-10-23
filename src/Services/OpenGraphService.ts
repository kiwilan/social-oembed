import { OpenGraph } from '../Models/OpenGraph'

export default class OpenGraphService {
  protected url: string
  protected openGraph?: OpenGraph
  protected is_twitter = false

  protected constructor(url: string) {
    this.url = url
  }

  public static async make(url: string): Promise<OpenGraph> {
    const service = new OpenGraphService(url)

    if (url.includes('twitter')) {
      // TODO twitter
    }

    // TODO twitter webpage into website settings, media lozad
    service.openGraph = await OpenGraph.make(service.url)

    return service.openGraph
  }
}
