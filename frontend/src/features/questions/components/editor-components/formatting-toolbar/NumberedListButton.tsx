// import {
//   ToolbarButton,
//   useBlockNoteEditor,
//   useEditorContentOrSelectionChange,
// } from '@blocknote/react'
// import { useState } from 'react'
// import { ImListNumbered } from 'react-icons/im'

// export default function NumberListButton() {
//   const editor = useBlockNoteEditor()

//   const [isSelected, setIsSelected] = useState<boolean>(
//     [editor.getTextCursorPosition().block][0].type === 'numberedListItem',
//   )

//   useEditorContentOrSelectionChange(() => {
//     setIsSelected([editor.getTextCursorPosition().block][0].type === 'numberedListItem')
//   }, editor)

//   const toggleNumberedListItem = () => {
//     const blockType = isSelected ? 'paragraph' : 'numberedListItem'
//     editor.updateBlock([editor.getTextCursorPosition().block][0].id, { type: blockType })
//   }

//   return (
//     <ToolbarButton
//       mainTooltip='NumberedList'
//       onClick={() => {
//         toggleNumberedListItem()
//       }}
//       isSelected={isSelected}
//       icon={ImListNumbered}
//     />
//   )
// }
