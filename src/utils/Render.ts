import { renderToString } from 'react-dom/server'
import OpenGraphRender from '~/renders/OpenGraphRender'
import type { OpenGraphResponse } from '~/types'

export default class Render {
  protected constructor(
    protected component: any,
    protected dark: boolean = false,
  ) {}

  public static make(component: any): Render {
    const render = new Render(component)

    return render
  }

  public static openGraph(og: OpenGraphResponse, dark = false): string {
    const render = Render.make(OpenGraphRender)
    render.dark = dark
    return render.toHtml(og, dark)
  }

  public toHtml(...props: any): string {
    return renderToString(this.component(...props))
  }
}
