import SocialIcon from './SocialIcon'
import type { OpenGraphRenderProps } from '~/types/social'
import type { IOpenGraph } from '~/types/api'
import type { IApiRouteQuery } from '~/types/route'

const OpenGraphRender = (
  props: OpenGraphRenderProps & {
    query: IApiRouteQuery
  }
) => {
  const dark = props.query.dark || false
  const borderColor = dark ? '#374151' : '#E5E7EB'
  const backgroundColor = dark ? '#1f2937' : '#F9FAFB'
  const color = dark ? '#f9fafb' : '#111827'
  const colorLight = dark ? '#94a3b8' : '#64748b'
  const roundedMd = '0.375rem'
  const textSm = '0.75rem'
  const textLg = '1.125rem'
  const width = '28rem'
  const paddingText = '0.75rem 1rem'
  const imgHeight = '10rem'
  const marginTop = '0.5rem'
  const fontFamily =
    'font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'

  const og: IOpenGraph = props.og || {}
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
            display: 'flex',
            alignContent: 'center',
          }}
        >
          {og.social !== 'unknown' && (
            <div
              style={{
                width: '1.25rem',
                height: '1.25rem',
                margin: 'auto 0.5rem auto 0',
              }}
            >
              <SocialIcon social={og.social} color={og.themeColor} />
            </div>
          )}
          <div
            style={{
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {og.title}
          </div>
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
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {removeHttp(og.siteUrl)}
        </div>
      </div>
    </a>
  )
}

export default OpenGraphRender
