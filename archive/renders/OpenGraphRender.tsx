import type { FC } from 'react'
import type { OpenGraphResponse } from '~/types'

const OpenGraphRender: FC = (og: OpenGraphResponse) => {
  const borderColor = og.dark ? '#374151' : '#E5E7EB'
  const backgroundColor = og.dark ? '#1f2937' : '#F9FAFB'
  const color = og.dark ? '#f9fafb' : '#111827'
  const colorLight = og.dark ? '#94a3b8' : '#64748b'
  const roundedMd = '0.375rem'
  const textSm = '0.75rem'
  const textLg = '1.125rem'
  const width = '28rem'
  const paddingText = '0.75rem 1rem'
  const imgHeight = '10rem'
  const marginTop = '0.5rem'
  // eslint-disable-next-line operator-linebreak
  const fontFamily =
    'font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
  const themeColor = og.themeColor ?? '#ffffff'

  const removeHttp = (url?: string) =>
    url ? url.replace(/^https?:\/\//, '') : ''

  return (
    <a
      href={og.siteUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'block',
        marginInline: 'auto',
        width,
        border: `1px solid ${borderColor}`,
        backgroundColor,
        color,
        borderRadius: roundedMd,
        fontFamily,
      }}
      title={og.siteName}
    >
      {og.image ? (
        <img
          src={og.image}
          alt={og.title}
          loading="lazy"
          style={{
            width: '100%',
            height: imgHeight,
            objectFit: 'cover',
            objectPosition: 'center',
            borderTopLeftRadius: roundedMd,
            borderTopRightRadius: roundedMd,
          }}
        />
      ) : null}
      <div
        style={{
          backgroundColor: themeColor,
          marginTop: '0.75rem',
          height: '0.25rem',
          width: '50%',
          marginInline: 'auto',
          borderRadius: roundedMd,
        }}
      ></div>
      <div
        style={{
          padding: paddingText,
        }}
      >
        <div
          style={{
            fontSize: textLg,
            marginTop: 0,
          }}
        >
          {og.title}
        </div>
        <div
          style={{
            fontSize: textSm,
            marginTop,
          }}
        >
          {og.description}
        </div>
        <div
          style={{
            marginTop,
            fontSize: textSm,
            color: colorLight,
          }}
        >
          {removeHttp(og.siteUrl)}
        </div>
      </div>
    </a>
  )
}

export default OpenGraphRender
