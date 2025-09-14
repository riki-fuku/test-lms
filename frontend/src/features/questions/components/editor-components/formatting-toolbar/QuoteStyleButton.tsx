// import type { schema } from '@/features/questions/components/CreateMain'
// import {
//   ToolbarButton,
//   useBlockNoteEditor,
//   useEditorContentOrSelectionChange,
// } from '@blocknote/react'
// import { useState } from 'react'
// import { MdFormatQuote } from 'react-icons/md'

// export const QuoteStyleButton = () => {
//   const editor = useBlockNoteEditor<
//     typeof schema.blockSchema,
//     typeof schema.inlineContentSchema,
//     typeof schema.styleSchema
//   >()
//   const [isSelected, setIsSelected] = useState(false)
//   useEditorContentOrSelectionChange(() => {
//     setIsSelected([editor.getTextCursorPosition().block][0].type === 'blockQuote')
//   }, editor)

//   const toggleQuote = () => {
//     const blockType = isSelected ? 'paragraph' : 'blockQuote'
//     editor.updateBlock([editor.getTextCursorPosition().block][0].id, { type: blockType })
//   }

//   return (
//     <ToolbarButton
//       mainTooltip='Block Quote'
//       icon={MdFormatQuote}
//       onClick={() => {
//         toggleQuote()
//       }}
//       isSelected={isSelected}
//     />
//   )
// }
