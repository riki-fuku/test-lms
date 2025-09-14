import { default as Link } from 'next/link'

export type BreadCrumbLink = {
  href?: string
  title: string
}

type BreadCrumbProps = {
  links: BreadCrumbLink[]
}

export default function BreadCrumb(props: BreadCrumbProps) {
  return (
    <nav className='w-full'>
      <ol className='list-reset flex items-center'>
        {props.links.map((link, index) => (
          <li key={index} className='flex items-center'>
            {index !== 0 && (
              <span className='mx-2 translate-y-[-0.1em] items-center text-sm text-text-secondary'>
                &gt;
              </span>
            )}
            {link.href && (
              <Link href={link.href} className='cursor-pointer text-xs text-main-color'>
                {link.title}
              </Link>
            )}
            {!link.href && <span className='text-xs text-text-secondary'>{link.title}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}
