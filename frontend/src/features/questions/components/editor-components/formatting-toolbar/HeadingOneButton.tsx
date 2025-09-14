// import {
//   ToolbarButton,
//   useBlockNoteEditor,
//   useEditorContentOrSelectionChange,
// } from '@blocknote/react'
// import { useState } from 'react'
// import { CiBookmark } from 'react-icons/ci'

// export default function HeadingOneButton() {
//   const editor = useBlockNoteEditor()

//   const [isSelected, setIsSelected] = useState<boolean>(
//     [editor.getTextCursorPosition().block][0].type === 'heading',
//   )

//   useEditorContentOrSelectionChange(() => {
//     setIsSelected([editor.getTextCursorPosition().block][0].type === 'heading')
//   }, editor)

//   return (
//     <ToolbarButton
//       mainTooltip='heading'
//       onClick={() => {
//         editor.updateBlock([editor.getTextCursorPosition().block][0].id, { type: 'heading' })
//       }}
//       isSelected={isSelected}
//       icon={CiBookmark}
//     />
//   )
// }
