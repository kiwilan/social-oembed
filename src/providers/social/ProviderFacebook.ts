import ProviderModule from '~/providers/social/ProviderModule'
import type { IOpenGraph } from '~/types/api'
import type { IProviderModule, ISocialIdentifier, Social } from '~/types/social'

export default class ProviderFacebook extends ProviderModule {
  protected init(): IProviderModule {
    return {
      social: 'facebook' as Social,
      regex: /(?:https?:\/\/)?(?:www\.)?facebook\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]*)/g,
      // endpoint: '',
      iframe: { width: 550, height: 720 },
    }
  }

  protected setIdentifiers(): ISocialIdentifier {
    const id = this.params.matches[2] ?? undefined

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

    const embedUrl = id
      ? `https://www.facebook.com/plugins/video.php?href=${encodeURI(this.params.url)}&${params.toString()}`
      : undefined

    return {
      url: this.params.matches[0] ?? undefined,
      user: this.params.matches[1] ?? undefined,
      id,
      embedUrl,
    }
  }

  protected async setResponse(): Promise<IOpenGraph> {
    return {}
  }
}
