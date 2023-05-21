import React from 'react'
import type { Social } from '../types'
import { svg } from './SocialAssets'

function SocialIcon(props: { social?: Social; color?: string }) {
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

  if (props.social === 'unknown' || props.social === undefined)
    return null

  return <div
    dangerouslySetInnerHTML={{ __html: getIcon(social) }}
    style={{
      width: '1.25rem',
      height: '1.25rem',
      margin: 'auto 0',
      color: props.color ?? 'inherit',
    }}
  ></div>
}

export default SocialIcon
