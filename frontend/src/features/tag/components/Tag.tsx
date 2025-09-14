import type { Tag as TagType } from '@/features/tag/types/Tag'
import ROLE from '@/features/user/constants/role'
import type { Role } from '@/features/user/types/Role'

type TagProps = {
  tag: TagType
  children: React.ReactNode
  className?: string
  onClick?: (tag: TagType) => void
  onDelete?: (tag: TagType) => void
}

export default function Tag(props: TagProps) {
  function getBgColor(role: Role | undefined) {
    switch (role) {
      case ROLE.COACH_USER:
        return 'border border-border-secondary bg-white text-text-secondary'
      default:
        return 'bg-bg-tertiary'
    }
  }

  function handleClick() {
    props.onClick && props.onClick(props.tag)
  }

  function handleDelete(e: React.MouseEvent<SVGElement>) {
    e.stopPropagation()
    props.onDelete && props.onDelete(props.tag)
  }

  // return (
  //   <div
  //     className={cn(
  //       'whitespace-nowrap rounded px-2 py-1 text-sm',
  //       'flex items-center',
  //       'text-white transition',
  //       getBgColor(props.tag.created_user?.role),
  //       props.className,
  //     )}
  //     onClick={handleClick}
  //   >
  //     {props.children}
  //     {props.onDelete && (
  //       <RxCross2
  //         className={cn(
  //           'ml-2 inline-block cursor-pointer rounded-full border',
  //           getBgColor(props.tag.created_user?.role),
  //         )}
  //         onClick={handleDelete}
  //       />
  //     )}
  //   </div>
  // )
}
