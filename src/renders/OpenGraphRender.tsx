import type { FC } from 'react'
import type { IOpenGraph } from '~/types/api'

const OpenGraphRender: FC = (og: IOpenGraph, dark: boolean) => {
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
          {og.twitter && (
            <div
              style={{
                display: 'flex',
              }}
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                style={{
                  width: '1.25rem',
                  height: '1.25rem',
                  margin: 'auto',
                }}
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Twitter</title>
                <path
                  d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                  fill="#1DA1F2"
                />
              </svg>
            </div>
          )}
          <div
            style={{
              marginLeft: og.twitter ? '0.5rem' : 0,
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
          }}
        >
          {removeHttp(og.siteUrl)}
        </div>
      </div>
    </a>
  )
}

export default OpenGraphRender
