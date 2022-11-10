/* eslint-disable quote-props */
import type { IApiRouteQuery } from '~/types/route'
import type { OEmbedRenderProps } from '~/types/social'

const OEmbedRender = (
  props: OEmbedRenderProps & {
    query: IApiRouteQuery
  }
) => {
  const module = props.provider?.module

  const heightProvider = module?.iframe?.height?.toString()
  const widthProvider = module?.iframe?.width?.toString()

  const heigthQuery = props.query.height
  const widthQuery = props.query.width

  const allowMobile =
    'accelerometer; encrypted-media; gyroscope; clipboard-write;'

  const oembed = {
    isValid: props.embedUrl ? props.embedUrl : false,
    url: props.embedUrl,
    width: widthQuery || widthProvider,
    height: heigthQuery || heightProvider,
    title: props.model?.title,
    allow: `fullscreen;encrypted-media;picture-in-picture;autoplay; ${
      props.query.is_mobile ? allowMobile : ''
    }`,
  }

  const iframe = {
    div: {
      display: 'flex',
      '&:active': {
        outline: '0',
        border: 'none',
        '-moz-outline-style': 'none',
      },
      '&:focus': {
        outline: 0,
        border: 'none',
        '-moz-outline-style': 'none',
      },
    },
  }

  return (
    <div style={iframe.div}>
      {oembed.isValid ? (
        <iframe
          src={oembed.url}
          width={oembed.width}
          height={oembed.height}
          title={oembed.title}
          style={{
            border: 0,
            margin: '0 auto',
            overflow: 'auto',
            outline: 'none',
          }}
          scrolling="yes"
          frameBorder={0}
          allowFullScreen
          allow={oembed.allow}
          loading="lazy"
        ></iframe>
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default OEmbedRender
