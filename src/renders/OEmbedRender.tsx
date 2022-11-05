import type { FC } from 'react'
import type { IApiData } from '~/types/api'

const OEmbedRender: FC = (model: IApiData) => {
  const url = model.embedUrl
  const width = '100%'
  const height = model.embedUrl ? 450 : 0
  const title = model.title
  let allow = model.isMobile
    ? 'accelerometer; autoplay; encrypted-media; gyroscope; clipboard-write; picture-in-picture;'
    : ''
  allow += 'fullscreen;encrypted-media;'

  return (
    <div>
      {model.embedUrl ? (
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
      ) : (
        <div>Loading failed</div>
      )}
    </div>
  )
}

export default OEmbedRender
