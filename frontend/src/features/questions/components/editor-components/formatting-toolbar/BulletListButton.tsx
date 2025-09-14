// import {
//   ToolbarButton,
//   useBlockNoteEditor,
//   useEditorContentOrSelectionChange,
// } from '@blocknote/react'
// import { useState } from 'react'
// import { RiListUnordered } from 'react-icons/ri'

// export default function BulletListButton() {
//   const editor = useBlockNoteEditor()

//   const [isSelected, setIsSelected] = useState<boolean>(
//     [editor.getTextCursorPosition().block][0].type === 'bulletListItem',
//   )

//   useEditorContentOrSelectionChange(() => {
//     setIsSelected([editor.getTextCursorPosition().block][0].type === 'bulletListItem')
//   }, editor)

//   const toggleBulletList = () => {
//     const blockType = isSelected ? 'paragraph' : 'bulletListItem'
//     editor.updateBlock([editor.getTextCursorPosition().block][0].id, { type: blockType })
//   }

//   return (
//     <ToolbarButton
//       mainTooltip='BulletList'
//       onClick={() => {
//         toggleBulletList()
//       }}
//       isSelected={isSelected}
//       icon={RiListUnordered}
//     />
//   )
// }
