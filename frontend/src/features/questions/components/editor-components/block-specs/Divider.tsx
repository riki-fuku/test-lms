import { defaultProps } from '@blocknote/core'
import { createReactBlockSpec } from '@blocknote/react'

export const Divider = createReactBlockSpec(
  {
    type: 'divider',
    propSchema: {
      textAlignment: defaultProps.textAlignment,
      textColor: defaultProps.textColor,
    },
    content: 'none',
  },
  {
    render: () => (
      <div className='bn-block-outer' data-node-type='blockOuter'>
        <div className='bn-block' data-node-type='blockContainer'>
          <div className='bn-block-content'>
            <div
              style={{
                height: '0',
                borderBottom: '1px solid rgba(55,53,47,0.16)',
                margin: '12px 0',
              }}
            />
          </div>
        </div>
      </div>
    ),
  },
)
