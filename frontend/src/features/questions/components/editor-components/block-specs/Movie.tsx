import { defaultProps } from '@blocknote/core'
import { createReactBlockSpec } from '@blocknote/react'

export const Movie = createReactBlockSpec(
  {
    type: 'movie',
    propSchema: {
      ...defaultProps,
      src: {
        default: 'https://videos.pexels.com/video-files/15921892/15921892-uhd_3840_2160_50fps.mp4',
      },
    },
    content: 'inline',
  },
  {
    render: (props) => {
      const videoSrc = !props.block.props.src
        ? 'https://videos.pexels.com/video-files/15921892/15921892-uhd_3840_2160_50fps.mp4'
        : props.block.props.src

      return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <video src={videoSrc} controls style={{ width: '100%' }}></video>
          <div style={{ flexGrow: 1 }}></div>
        </div>
      )
    },
  },
)
