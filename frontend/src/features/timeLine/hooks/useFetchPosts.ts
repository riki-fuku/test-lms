import fetchPosts from '@/features/timeLine/api/fetchPosts'
import useSWR from 'swr'

export default function useFetchPosts() {
  const { data } = useSWR('/api/users/post', fetchPosts)
  return { data }
}
