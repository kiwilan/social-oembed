import OpenGraph from './OpenGraph'
import ApiModule from '~/models/ApiModule'
import SocialService from '~/services/SocialService'
import type { FetchMeta, IApiRouteQuery } from '~/types/route'
import type { IApiData, IOpenGraph } from '~/types/api'
import RenderService from '~/services/RenderService'

export default class OEmbed extends ApiModule {
  protected model: IApiData = {}
  protected isOpenGraph = false

  public static async make(query: IApiRouteQuery): Promise<OEmbed> {
    const oembed = new OEmbed(query)
    if (!oembed.query.url)
      return oembed

    let openGraph: IOpenGraph = {}
    let fetchMeta: FetchMeta | undefined = {}
    const social = await SocialService.make(oembed.query).getOembed()

    // TODO shared interface
    if (social.isValid()) {
      openGraph = social.getOpenGraph()
      fetchMeta = social.getFetchMeta()
      oembed.render = RenderService.oembed(openGraph, query)
    }
    else {
      const og = await OpenGraph.make(query)
      openGraph = og.getOpenGraph()
      fetchMeta = og.getFetchMeta()
      oembed.render = RenderService.openGraph(openGraph, query)
      oembed.isOpenGraph = true
    }

    if (social) {
      oembed.model = {
        ...openGraph,
        embedUrl: social.getIdentifiers().embedUrl
      }
      oembed.fetchMeta = fetchMeta
    }

    return oembed
  }

  public getModel(): IApiData {
    return this.model
  }

  public getIsOpenGraph(): boolean {
    return this.isOpenGraph
  }
}
