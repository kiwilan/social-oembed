import type { IApiData } from '~/types/api'

const OEmbedRender = (model: IApiData) => {
  const url = model.embedUrl
  const width = model.width ? model.width : '100%'
  const height = model.embedUrl ? (model.height ? model.height : 450) : 0
  const title = model.title
  let allow = model.isMobile
    ? 'accelerometer; autoplay; encrypted-media; gyroscope; clipboard-write; picture-in-picture;'
    : ''
  allow += 'fullscreen;encrypted-media;'

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      {model.embedUrl ? (
        <iframe
          src={url}
          width={width}
          height={height}
          title={title}
          style={{
            border: 'none',
            margin: '0 auto',
          }}
          scrolling="yes"
          frameBorder="0"
          allowFullScreen
          allow={allow}
          loading="lazy"
        ></iframe>
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default OEmbedRender
