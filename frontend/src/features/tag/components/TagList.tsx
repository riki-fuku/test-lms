import type { Tag as TagType } from '@/features/tag/types/Tag'

type TagListProps = {
  tags: TagType[]
  onClickTag?: (tag: TagType) => void
  onDelete?: (tag: TagType) => void
}

export default function TagList(props: TagListProps) {
  // function sortTags(tags: TagType[]) {
  //   const adminTags = tags.filter((tag) => tag.created_user?.role === ROLE.ADMIN_USER)
  //   const coachTags = tags.filter((tag) => tag.created_user?.role === ROLE.COACH_USER)

  //   return adminTags.concat(coachTags)
  // }

  function handleClickTag(tag: TagType) {
    props.onClickTag && props.onClickTag(tag)
  }

  function handleDelete(tag: TagType) {
    props.onDelete && props.onDelete(tag)
  }

  // return sortTags(props.tags).map((tag) => (
  //   <Tag
  //     key={tag.id}
  //     tag={tag}
  //     onClick={handleClickTag}
  //     onDelete={props.onDelete ? () => handleDelete(tag) : undefined}
  //   >
  //     {tag.name}
  //   </Tag>
  // ))
}
