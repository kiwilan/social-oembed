import type { IApiData } from '~/types/api'
import type { IframeSize } from '~/types/social'

const OEmbedRender = (
  embedUrl?: string,
  model?: IApiData,
  iframeSize?: IframeSize
) => {
  let isValid = false
  const url = embedUrl
  let width = '0'
  let height = '0'
  let title = ''
  let allow = 'fullscreen;encrypted-media; '

  const setModel = () => {
    if (!model) {
      //
      return
    }
    width = model.width ? model.width : '100%'
    height = model.height ? model.height : '450'
    title = model.title ? model.title : ''
    allow += model.isMobile
      ? 'accelerometer; autoplay; encrypted-media; gyroscope; clipboard-write; picture-in-picture;'
      : ''
  }

  if (url) {
    isValid = true
    height = iframeSize?.height ? iframeSize.height.toString() : '450'
    width = iframeSize?.width ? iframeSize.width.toString() : '100%'
  }

  if (model && Object.keys(model).length) {
    //
    setModel()
  }

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      {isValid ? (
        <iframe
          src={url}
          width={width}
          height={height}
          title={title}
          style={{
            border: 0,
            margin: '0 auto',
            overflow: 'auto',
          }}
          scrolling="yes"
          frameBorder={0}
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
