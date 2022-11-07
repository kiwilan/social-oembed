import { renderToString } from 'react-dom/server'
import OpenGraphRender from '~/renders/OpenGraphRender'
import OEmbedRender from '~/renders/OEmbedRender'
import type { OpenGraphResponse } from '~/types'
import type { IApiRouteQuery } from '~/types/route'
import type { IframeSize } from '~/types/social'

export default class RenderService {
  protected constructor(
    protected component: any,
    protected query: IApiRouteQuery,
    protected dark: boolean = false,
  ) {}

  public static make(component: any, query: IApiRouteQuery): RenderService {
    const render = new RenderService(component, query)
    render.dark = query.dark || false

    return render
  }

  public static openGraph(model: OpenGraphResponse, query: IApiRouteQuery): string {
    const render = RenderService.make(OpenGraphRender, query)
    return render.toHtml(model, render.dark)
  }

  public static oembed(embedUrl: string, model: any, query: IApiRouteQuery, iframeSize: IframeSize): string {
    const render = RenderService.make(OEmbedRender, query)
    return render.toHtml(embedUrl, model, iframeSize)
  }

  public toHtml(...props: any): string {
    return renderToString(this.component(...props))
  }
}
