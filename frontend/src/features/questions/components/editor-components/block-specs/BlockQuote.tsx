import { defaultProps } from '@blocknote/core'
import { createReactBlockSpec } from '@blocknote/react'

export const BlockQuote = createReactBlockSpec(
  {
    type: 'blockQuote',
    propSchema: {
      textAlignment: defaultProps.textAlignment,
      textColor: defaultProps.textColor,
    },
    content: 'inline',
  },
  {
    render: (props) => (
      <div
        style={{
          borderLeft: '0.25rem solid currentcolor',
          padding: '0 0.75rem',
        }}
        ref={props.contentRef}
      />
    ),
  },
)
