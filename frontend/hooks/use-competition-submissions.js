import useSWR from 'swr'
import { api } from '../config'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function useCompetitionSubmissions(id, isCompetitionOver) {
  let query = false
  if (typeof id !== 'undefined') {
    query = true
  }

  const { data, error } = useSWR(
    () =>
      isCompetitionOver
        ? `${api}/competitions/${id}/submissions/votes`
        : `${api}/competitions/${id}/submissions`,
    fetcher
  )

  return {
    submissions: data,
    loading: !error && !data,
    error,
  }
}
