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

    if (social.model?.id)
      social.isValid = true

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
      dailymotion: this.dailymotion(),
      spotify: this.spotify(),
      twitter: this.twitter(),
      youtube: this.youtube()
    }
    const media = methods[this.type as keyof typeof methods] ?? undefined

    return media
  }

  private setRegExp(): RegExp | undefined {
    const regExps: ISocial = {
      // dailymotion: /(?:https?:\/\/)?(?:www\.)?(?:dai\.ly|dailymotion\.com)\/(?:video|hub)\/([a-zA-Z0-9]+)_?/i,
      dailymotion: /(?:https?:\/\/)?(?:www\.)?dai\.?ly(motion)?(?:\.com)?\/?.*(?:video|embed)?(?:.*v=|v\/|\/)([a-z0-9]+)/ig,
      facebook: /(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?/ig,
      flickr: /(?:https?:\/\/)?(?:www\.)?flic\.kr\/p\/([a-zA-Z0-9]+)/ig,
      instagram: /(?:https?:\/\/)?(?:www\.)?instagram\.com\/p\/([a-zA-Z0-9]+)/ig,
      giphy: /(?:https?:\/\/)?(?:www\.)?giphy\.com\/gifs\/([a-zA-Z0-9]+)/ig,
      imgur: /(?:https?:\/\/)?(?:www\.)?imgur\.com\/gallery\/([a-zA-Z0-9]+)/ig,
      kickstarter: /(?:https?:\/\/)?(?:www\.)?kickstarter\.com\/projects\/([a-zA-Z0-9]+)/ig,
      linkedin: /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/([a-zA-Z0-9]+)/ig,
      pinterest: /(?:https?:\/\/)?(?:www\.)?pinterest\.com\/pin\/([a-zA-Z0-9]+)/ig,
      reddit: /(?:https?:\/\/)?(?:www\.)?reddit\.com\/r\/([a-zA-Z0-9]+)/ig,
      snapchat: /(?:https?:\/\/)?(?:www\.)?snapchat\.com\/add\/([a-zA-Z0-9\.\-\_]+)/ig,
      // spotify: /(?:https?:\/\/)?(?:www\.)?open\.spotify\.com\/(track|album|artist)\/([a-zA-Z0-9]+)/ig,
      spotify: /^(https:\/\/open.spotify.com\/|user:track:album:artist:playlist:)([a-zA-Z0-9]+)(.*)$/mg,
      soundcloud: /(?:https?:\/\/)?(?:www\.)?soundcloud\.com\/([a-zA-Z0-9]+)/ig,
      ted: /(?:https?:\/\/)?(?:www\.)?ted\.com\/talks\/([a-zA-Z0-9]+)/ig,
      tiktok: /(?:https?:\/\/)?(?:www\.)?tiktok\.com\/([a-zA-Z0-9]+)/ig,
      tumblr: /(?:https?:\/\/)?(?:www\.)?tumblr\.com\/post\/([a-zA-Z0-9]+)/ig,
      twitch: /(?:https?:\/\/)?(?:www\.)?twitch\.tv\/([a-zA-Z0-9]+)/ig,
      twitter: /(?:https?:\/\/)?(?:www\.)?twitter\.com\/([a-zA-Z0-9]+)\/status\/([a-zA-Z0-9]+)/ig,
      // twitter: /^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status?\/(\d+)/g,
      vimeo: /(?:https?:\/\/)?(?:www\.)?vimeo\.com\/([a-zA-Z0-9]+)/ig,
      // youtube: /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9]+)/ig,
      youtube: /^(?:http(?:s)?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:(?:watch)?\?(?:.*&)?v(?:i)?=|(?:embed|v|vi|user|shorts)\/))([^\?&\"'>]+)/g
    }

    return regExps[this.type as keyof typeof regExps] ?? undefined
  }

  private dailymotion(): ISocialRegex {
    const id = this.matches[2] ?? undefined
    const embedUrl = id ? `https://www.dailymotion.com/embed/video/${id}` : undefined

    return {
      url: this.matches[0] ?? undefined,
      embedUrl
    }
  }

  private spotify(): ISocialRegex {
    const id = this.matches[3] ? this.matches[3].replace('/', '') : undefined
    const type = this.matches[2] ?? 'track'
    const embedUrl = `https://open.spotify.com/embed/${type}/${id}?`

    return {
      url: this.matches[0] ?? undefined,
      type,
      id,
      embedUrl
    }
  }

  private twitter(): ISocialRegex {
    const id = this.matches[2] ?? undefined

    return {
      url: this.matches[0] ?? undefined,
      user: this.matches[1] ?? undefined,
      id,
    }
  }

  private youtube(): ISocialRegex {
    const id = this.matches[1] ?? undefined

    return {
      url: this.matches[0] ?? undefined,
      id,
      embedUrl: id ? `https://www.youtube.com/embed/${id}` : undefined
    }
  }
}
