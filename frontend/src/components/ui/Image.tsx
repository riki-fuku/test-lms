import cn from '@/hooks/cn'
import type { ImageProps as NextImageProp } from 'next/image'
import NextImage from 'next/image'

type ImageProps = NextImageProp & {
  className?: string
}

export default function Image(props: ImageProps) {
  // const isProd = process.env.NODE_ENV === 'production'
  // const basePath = isProd ? '/n' : ''
  const basePath = ''

  const className = cn('object-contain', props.className)

  return (
    <>
      <NextImage
        className={className}
        {...props}
        alt={props.alt || ''}
        src={basePath + props.src}
      />
    </>
  )
}
