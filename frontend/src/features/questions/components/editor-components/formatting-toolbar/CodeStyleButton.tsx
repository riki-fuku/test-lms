// import type { schema } from '@/features/questions/components/CreateMain'
// import {
//   ToolbarButton,
//   useBlockNoteEditor,
//   useEditorContentOrSelectionChange,
// } from '@blocknote/react'
// import { useState } from 'react'
// import { FaCode } from 'react-icons/fa6'

// export const CodeStyleButton = () => {
//   const editor = useBlockNoteEditor<
//     typeof schema.blockSchema,
//     typeof schema.inlineContentSchema,
//     typeof schema.styleSchema
//   >()
//   const [isSelected, setIsSelected] = useState<boolean>(editor.getActiveStyles().notionCode === '')
//   useEditorContentOrSelectionChange(() => {
//     setIsSelected(editor.getActiveStyles().notionCode === '')
//   }, editor)

//   return (
//     <ToolbarButton
//       mainTooltip='Code'
//       icon={FaCode}
//       onClick={() => {
//         editor.toggleStyles({
//           notionCode: '',
//         })
//       }}
//       isSelected={isSelected}
//     />
//   )
// }
