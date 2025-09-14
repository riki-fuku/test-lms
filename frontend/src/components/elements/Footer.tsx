import cn from '@/hooks/cn'
import Link from 'next/link'

type FooterProps = {
  className?: string
}

export default function Footer(props: FooterProps) {
  return (
    <>
      <footer className={cn(`flex h-10 items-center justify-center`, props.className)}>
        <div className='flex gap-8 p-4 text-xs lg:text-base'>
          <p>&copy;estra inc.</p>
          <Link href='/privacy'>プライバシーポリシー</Link>
          <Link href='https://estra.jp/'>運営会社</Link>
        </div>
      </footer>
    </>
  )
}
