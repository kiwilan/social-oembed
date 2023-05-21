import { renderToString } from 'react-dom/server'
import OpenGraphRender from '~/renders/OpenGraphRender'
import OEmbedRender from '~/renders/OEmbedRender'
import type { IApiRouteQuery, OEmbedRenderProps, OpenGraphRenderProps } from '~/types'

export default class RenderService {
  protected constructor(
    protected query: IApiRouteQuery,
  ) {}

  public static make(query: IApiRouteQuery): RenderService {
    const render = new RenderService(query)

    return render
  }

  public toOEmbed(props: OEmbedRenderProps): string {
    return this.toString(OEmbedRender, {
      ...props,
      query: this.query,
    })
  }

  public toOpenGraph(props: OpenGraphRenderProps): string {
    return this.toString(OpenGraphRender, {
      ...props,
      query: this.query,
    })
  }

  private toString(component: any, ...props: any): string {
    return renderToString(component(...props))
  }
}
