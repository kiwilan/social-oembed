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
    // console.log(social)

    // TODO shared interface
    if (social.isValid()) {
      const iframeSize = social.getiframeSize()
      openGraph = social.getOpenGraph()
      fetchMeta = social.getFetchMeta()

      const embedUrl = social.getIdentifiers().embedUrl
      if (embedUrl && !social.getOverrideIframe())
        oembed.render = RenderService.oembed(embedUrl, openGraph, query, iframeSize)

      if (social.getOverrideIframe())
        oembed.render = social.getHtml()
    }
    else {
      const og = await OpenGraph.make(query)
      openGraph = og.getOpenGraph()
      fetchMeta = og.getFetchMeta()
      oembed.render = RenderService.openGraph(openGraph, query)
      oembed.isOpenGraph = true
    }

    if (oembed.fetchMeta?.ok)
      oembed.isValid = true

    oembed.model.isValid = oembed.isValid

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
