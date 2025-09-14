import Button from '@/components/ui/Button'
import Check from '@/components/ui/Check'
import Divider from '@/components/ui/Divider'
import LabelCategory from '@/features/questions/components/LabelCategory'
import SideLayout from '@/features/questions/components/SideLayout'
import TagLabel from '@/features/questions/components/TagLabel'
import useFetchQuestionCategories from '@/features/questions/hooks/useFetchQuestionCategories'
import useFetchQuestionTags from '@/features/questions/hooks/useFetchQuestionTags'
import type { QuestionTag } from '@/features/questions/types/QuestionTag'
import Link from 'next/link'

type CreateSideProps = {
  workspaceId: string
  className?: string
  onSubmitQuestion: () => void
  onChangeCategory: (categoryId: number) => void
  onChangeTags: (tag: QuestionTag, value: boolean) => void
  onNextPage?: () => void
  selectedCategoryId: number | null
  selectedTags: QuestionTag[]
}

export default function CreateSide({
  workspaceId,
  className,
  onSubmitQuestion,
  onChangeCategory,
  onChangeTags,
  onNextPage,
  selectedCategoryId,
  selectedTags,
}: CreateSideProps) {
  const { data: categoryList } = useFetchQuestionCategories({
    revalidateOnFocus: false,
  })
  const { data: tagList } = useFetchQuestionTags(workspaceId, {
    revalidateOnFocus: false,
  })

  function handlePolicyModal() {
    onSubmitQuestion()
  }

  const handleCreateQuestion = () => {
    onNextPage && onNextPage()
  }

  const handleChangeCategory = (categoryId: number) => {
    onChangeCategory(categoryId)
  }

  const handleChangeTags = (tag: QuestionTag, value: boolean) => {
    onChangeTags(tag, value)
  }

  return (
    <SideLayout className={className}>
      <div className='flex flex-col gap-8'>
        <Button className='hidden w-full lg:block' size='md' onClick={handlePolicyModal}>
          質問する
        </Button>

        <div className='flex flex-col gap-5'>
          <h3 className='border-grey-tertiary border-b py-2.5'>
            カテゴリーを選択<span className='text-warn-red'>*</span>
          </h3>
          {categoryList?.map((category) => (
            <div className='flex items-center gap-1' key={category.value}>
              <Check
                value={selectedCategoryId === category.value}
                onClick={() => handleChangeCategory(category.value)}
              />{' '}
              <LabelCategory id={category.value} />
            </div>
          ))}
        </div>

        <div className='flex flex-col gap-5'>
          <h3 className='border-grey-tertiary border-b py-2.5'>
            タグ選択<span className='text-warn-red'>*</span>
          </h3>
          {tagList?.map((tag) => (
            <div className='flex items-center gap-1' key={tag.id}>
              <Check
                value={selectedTags ? selectedTags.some((t) => t.id === tag.id) : false}
                onClick={(value) => handleChangeTags(tag, value)}
              />
              <TagLabel key={tag.id} label={tag.name} />
            </div>
          ))}
        </div>

        <div className='grid w-full grid-cols-2 gap-5'>
          <Link href={`/renewal/${workspaceId}/questions`}>
            <Button className='w-full lg:hidden' intent='secondary' size='md'>
              戻る
            </Button>
          </Link>
          <Button className='w-full lg:hidden' size='md' onClick={handleCreateQuestion}>
            質問内容を入力
          </Button>
        </div>
      </div>

      <Divider className='hidden lg:block' />

      <div className='hidden lg:block'>
        <p>
          <a
            href='https://lms.coachtech.site/renewal/01jk3m1df0x0tj5hx5w651hmrp/help/categories/01JK3MD8YNVY16WHMZJQHCZKCD/chapters/01JK3MD8YR4WWT39FX3YHV6FF7/articles/01JK3MD8YYVK39363TPESFHRMZ/'
            className='cursor-pointer text-xs text-text-secondary underline'
          >
            マークダウンガイド
          </a>
        </p>
        <p>
          <a href='/' className='cursor-pointer text-xs text-text-secondary underline'>
            質問ガイド
          </a>
        </p>
      </div>
    </SideLayout>
  )
}
