import ProviderModule from '~/providers/social/ProviderModule'
import type { ISocialIdentifier, IframeSize, Social } from '~/types/social'

export default class ProviderFacebook extends ProviderModule {
  protected type: Social = 'facebook'
  protected regex =
    /(?:https?:\/\/)?(?:www\.)?facebook\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]*)/g

  protected endpoint: string | undefined
  protected iframeSize: IframeSize = { width: 550, height: 720 }

  protected providerMatch(): ISocialIdentifier {
    const id = this.matches[2] ?? undefined

    // console.log(this.matches)

    const params = new URLSearchParams()
    params.append('height', '476')
    // params.append('href', url)
    params.append('show_text', 'true') // show publication text
    params.append('width', '476')
    // params.append('show_captions', 'false') // show captions
    // params.append('show_date', 'false') // show publication date
    // params.append('show_likes', 'false') // show likes
    // params.append('show_comments', 'false') // show comments
    // params.append('show_user', 'false') // show user
    // params.append('show_bio', 'false') // show user bio
    // params.append('show_posts', 'false') // show user posts
    // params.append('show_facepile', 'false') // show user facepile
    // params.append('hide_cta', 'false') // hide call to action
    // params.append('small_header', 'false') // small header
    // params.append('adapt_container_width', 'false') // adapt container width
    // params.append('hide_cover', 'false') // hide cover
    // params.append('hide_cta', 'false') // hide call to action
    // params.append('tabs', 'timeline') // tabs
    // params.append('locale', 'fr_FR') // locale
    // params.append('app_id', '123456789') // app id
    params.append('t', '0')
    // width="476" height="591"

    const embedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURI(this.url)}&${params.toString()}`

    return {
      url: this.matches[0] ?? undefined,
      user: this.matches[1] ?? undefined,
      type: `https://www.facebook.com/plugins/video.php?${params.toString()}`,
      id,
      embedUrl,
    }
  }

  protected providerApi(): Promise<this> {
    // throw new Error('Method not implemented.')

    return Promise.resolve(this)
  }
}
