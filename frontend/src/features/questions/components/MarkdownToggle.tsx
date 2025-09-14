import cn from '@/hooks/cn'

type MarkdownToggleProps = {
  activeTab: string
  setActiveTab: (tab: 'markdown' | 'preview') => void
}

export default function MarkdownToggle({ activeTab, setActiveTab }: MarkdownToggleProps) {
  const baseStyle = 'cursor-pointer p-1 lg:px-4 lg:py-2 bg-weakGrey text-weakBlack'
  const activeStyle = 'bg-gradient-to-r from-sub-color to-main-color text-white'
  return (
    <div className='flex overflow-hidden rounded-sm text-xs lg:text-sm'>
      <button
        className={cn(baseStyle, activeTab === 'markdown' && activeStyle)}
        onClick={() => setActiveTab('markdown')}
      >
        マークダウン
      </button>
      <button
        className={cn(baseStyle, activeTab === 'preview' && activeStyle)}
        onClick={() => setActiveTab('preview')}
      >
        プレビュー
      </button>
    </div>
  )
}
