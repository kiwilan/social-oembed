import { renderToString } from 'react-dom/server'
import OpenGraphRender from '~/renders/OpenGraphRender'
import OEmbedRender from '~/renders/OEmbedRender'
import type { OpenGraphResponse } from '~/types'

export default class RenderService {
  protected constructor(
    protected component: any,
    protected dark: boolean = false,
  ) {}

  public static make(component: any): RenderService {
    const render = new RenderService(component)

    return render
  }

  public static openGraph(model: OpenGraphResponse, dark = false): string {
    const render = RenderService.make(OpenGraphRender)
    render.dark = dark
    return render.toHtml(model, dark)
  }

  public static oembed(model: any): string {
    const render = RenderService.make(OEmbedRender)
    return render.toHtml(model)
  }

  public toHtml(...props: any): string {
    return renderToString(this.component(...props))
  }
}
