import type { FC } from 'react'
import type { IApiData } from '~/types/api'

const OEmbedRender: FC = (model: IApiData) => {
  const url = model.embedUrl
  const width = '100%'
  const height = 450
  const title = model.title
  const allow = model.isMobile
    ? 'accelerometer; autoplay; encrypted-media; gyroscope; clipboard-write; picture-in-picture;'
    : ''

  return (
    <iframe
      src={url}
      width={width}
      height={height}
      title={title}
      style={{
        border: 'none',
      }}
      scrolling="no"
      frameBorder="0"
      allowFullScreen
      allow={allow}
      loading="lazy"
    ></iframe>
  )
}

export default OEmbedRender
