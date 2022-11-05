import type { Social } from '~/utils/Enums'
import { SocialEnum } from '~/utils/Enums'

export default class SocialRegex {
  private constructor(
    public url: string,
    public type: Social,
    public regexp?: RegExp | string,
    public matches: string[] = [],
    public media?: object,
    public isValid = false
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
    social.media = social.findMatches()

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

    const methods = {
      twitter: this.twitter()
    }
    const media = methods[this.type as keyof typeof methods] ?? undefined

    return media
  }

  private setRegExp(): RegExp | undefined {
    const regExps = {
      twitter: /^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status?\/(\d+)/g,
    }

    return regExps[this.type as keyof typeof regExps] ?? undefined
  }

  private twitter(): object {
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
}
