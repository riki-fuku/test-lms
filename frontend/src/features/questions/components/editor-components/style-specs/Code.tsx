import { createReactStyleSpec } from '@blocknote/react'

export const Code = createReactStyleSpec(
  {
    type: 'code',
    propSchema: 'string',
  },
  {
    render: (props) => (
      <span
        style={{
          color: '#EB5757',
          borderRadius: '4px',
          background: 'rgba(135,131,120,.15)',
          padding: '0.2rem 0.4rem',
        }}
        ref={props.contentRef}
      />
    ),
  },
)
