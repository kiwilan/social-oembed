import type { ISocial, ISocialRegex, Social } from '~/types/social'
import { SocialEnum } from '~/types/social'

export default class SocialRegex {
  private constructor(
    public url: string,
    public type: Social,
    public regexp?: RegExp | string,
    public matches: string[] = [],
    public isValid = false,
    public model?: ISocialRegex
  ) {}

  public static make(url: string): SocialRegex {
    let type: Social = 'unknown'

    const socialList = Object.keys(SocialEnum).filter((item) => {
      return isNaN(Number(item))
    })

    for (const social of socialList) {
      if (url.includes(social))
        type = social as Social
    }
    if (url.includes('youtu'))
      type = 'youtube'

    if (url.includes('flic.kr'))
      type = 'flickr'

    const social = new SocialRegex(url, type)
    social.regexp = social.setRegExp()
    social.model = social.findMatches()

    return social
  }

  private findMatches(): object | undefined {
    if (!this.regexp)
      return []

    const regExp = new RegExp(this.regexp)
    const matches = this.url.matchAll(regExp)
    const raw = [...matches]
    const matchList = raw[0] ?? []
    this.matches = matchList

    const methods: ISocial = {
      twitter: this.twitter(),
      youtube: this.youtube()
    }
    const media = methods[this.type as keyof typeof methods] ?? undefined

    return media
  }

  private setRegExp(): RegExp | undefined {
    const regExps: ISocial = {
      twitter: /^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status?\/(\d+)/g,
      youtube: /^(?:http(?:s)?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:(?:watch)?\?(?:.*&)?v(?:i)?=|(?:embed|v|vi|user|shorts)\/))([^\?&\"'>]+)/g
    }

    return regExps[this.type as keyof typeof regExps] ?? undefined
  }

  private twitter(): ISocialRegex {
    const url = this.matches[0] ?? undefined
    const user = this.matches[1] ?? undefined
    const id = this.matches[2] ?? undefined

    if (id)
      this.isValid = true

    return {
      url,
      user,
      id,
    }
  }

  private youtube(): ISocialRegex {
    const url = this.matches[0] ?? undefined
    const id = this.matches[1] ?? undefined
    const embedUrl = id ? `https://www.youtube.com/embed/${id}` : undefined

    if (id)
      this.isValid = true

    return {
      url,
      id,
      embedUrl
    }
  }
}
