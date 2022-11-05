import type { ISocial, ISocialRegex, Social } from '~/types/social'
import { SocialEnum } from '~/types/social'

export default class SocialRegex {
  private setRegExp(): RegExp | undefined {
    const regExps = {
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
      tiktok: /(@[a-zA-z0-9]*|.*)(\/.*\/|trending.?shareId=)([\d]*)/gm,
      tumblr: /(?:https?:\/\/)?(?:www\.)?tumblr\.com\/post\/([a-zA-Z0-9]+)/ig,
      twitch: /(?:https?:\/\/)?(?:www\.)?twitch\.tv\/([a-zA-Z0-9]+)/ig,
      twitter: /(?:https?:\/\/)?(?:www\.)?twitter\.com\/([a-zA-Z0-9]+)\/status\/([a-zA-Z0-9]+)/ig,
      // twitter: /^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status?\/(\d+)/g,
      vimeo: /(?:https?:\/\/)?(?:www\.)?vimeo\.com\/([a-zA-Z0-9]+)/ig,
      // youtube: /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9]+)/ig,
      youtube: /^(?:http(?:s)?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:(?:watch)?\?(?:.*&)?v(?:i)?=|(?:embed|v|vi|user|shorts)\/))([^\?&\"'>]+)/g
    }
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

  private tiktok(): ISocialRegex {
    let type = this.matches[2] ?? undefined
    if (type) {
      type = type.replace('/', '')
      type = type.replace('\\', '')
    }
    const id = this.matches[3] ?? undefined
    // const embedUrl = id ? `https://www.tiktok.com/embed/${id}` : undefined

    return {
      url: this.matches[0] ?? undefined,
      type,
      id,
      embedUrl: 'https://www.tiktok.com/embed/7072819797184171310'
    }
  }

  private vimeo(): ISocialRegex {
    const id = this.matches[1] ?? undefined
    const embedUrl = id ? `https://player.vimeo.com/video/${id}` : undefined

    return {
      url: this.matches[0] ?? undefined,
      id,
      embedUrl
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
