import { renderToString } from 'react-dom/server'
import OpenGraphRender from '~/renders/OpenGraphRender'
import type { OpenGraphResponse } from '~/types'

export default class Render {
  protected constructor(
    protected component: any,
  ) {}

  public static make(component: any): Render {
    const render = new Render(component)

    return render
  }

  public static openGraph(og: OpenGraphResponse): string {
    const render = Render.make(OpenGraphRender)
    return render.toHtml(og)
  }

  public toHtml(props: any): string {
    return renderToString(this.component(props))
  }
}
