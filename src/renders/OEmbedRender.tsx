import type { IApiRouteQuery } from '~/types/route'
import type { OEmbedRenderProps } from '~/types/social'

const OEmbedRender = (
  props: OEmbedRenderProps & {
    query: IApiRouteQuery
  }
) => {
  let isValid = false
  const url = props.embedUrl
  let width = '0'
  let height = '0'
  let title = ''
  let allow = 'fullscreen;encrypted-media; '

  const setModel = () => {
    if (!props.model) {
      //
      return
    }
    // width = props.model.width ? props.model.width : '100%'
    // height = props.model.height ? props.model.height : '450'
    title = props.model.title ? props.model.title : ''
    allow += props.model.isMobile
      ? 'accelerometer; autoplay; encrypted-media; gyroscope; clipboard-write; picture-in-picture;'
      : ''
  }

  if (url) {
    const module = props.provider?.module

    isValid = true
    height = module?.iframe?.height ? module?.iframe.height.toString() : '450'
    width = module?.iframe?.width ? module?.iframe.width.toString() : '100%'
  }

  if (props.model && Object.keys(props.model).length) {
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
