'use Client'
// import fetchUserQuery from '@/features/questions/api/fetchUserQuery'

type RelatedQuestionListProps = {
  className?: string
}

// const fetchUserQueryComponent = async (id: number) => {
//   const userQuery = await fetchUserQuery(id)
//   return userQuery
// }

export default function RelatedQuestionList({ className }: RelatedQuestionListProps) {
  // const ids = [1, 2, 3, 4, 5]
  // const [queryList, setQueryList] = useState<UserQuery[]>([])
  // useEffect(() => {
  //   const fetchAllPosts = async () => {
  //     try {
  //       const queries = await Promise.all(
  //         ids.map(async (id) => {
  //           const data = await fetchUserQueryComponent(id)
  //           return data
  //         }),
  //       )
  //       setQueryList(queries)
  //     } catch (error) {
  //       console.error('Error fetching posts:', error)
  //     }
  //   }
  //   fetchAllPosts()
  // }, [])
  // return (
  //   <div className={className}>
  //     {queryList.map((question, index) => (
  //       <RelatedQuestionCard
  //         key={index}
  //         question={question}
  //         className='border-b border-weakGrey px-1 py-2.5 first-of-type:border-t'
  //       />
  //     ))}
  //   </div>
  // )
}
