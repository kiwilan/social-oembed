import { svg } from './SocialAssets'
import type { Social } from '~/types/social'

const SocialIcon = (props: { social?: Social; color?: string }) => {
  let social = props.social
  if (!social) {
    //
    social = 'unknown'
  }

  const getIcon = (social: Social): string => {
    const icon = svg[social] ?? svg.unknown
    const attributes = {
      width: 'inherit',
      height: 'inherit',
      fill: 'currentColor',
    }

    let iconAttr = ''
    for (const attribute of Object.entries(attributes)) {
      //
      iconAttr += `${attribute[0]}="${attribute[1]}" `
    }
    let iconHtml = icon ?? ''
    iconHtml = iconHtml.replace('<svg', `<svg ${iconAttr}`)

    return iconHtml
  }

  return props.social && props.social !== 'unknown' ? (
    <div
      dangerouslySetInnerHTML={{ __html: getIcon(social) }}
      style={{
        width: '1.25rem',
        height: '1.25rem',
        margin: 'auto 0',
        color: props.color ?? 'inherit',
      }}
    ></div>
  ) : null
}

export default SocialIcon
