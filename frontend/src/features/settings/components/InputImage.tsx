import React, { forwardRef } from 'react'

export type Props = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const ref = forwardRef<HTMLInputElement, Props>(({ onChange }, ref) => {
  return <input ref={ref} type='file' accept='image/*' onChange={onChange} hidden />
})
ref.displayName = 'InputImage'

export default ref
