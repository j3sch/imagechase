import useSWR from 'swr'
import { api } from '../config'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function useCompetition(id) {
  let query = false
  if (typeof id !== 'undefined') {
    query = true
  }
  const { data, error } = useSWR(
    () => (test ? `${api}/competitions/${id}` : null),
    fetcher
  )

  return {
    competition: data,
    loading: !error && !data,
    error,
  }
}
