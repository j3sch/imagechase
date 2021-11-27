import useSWR from 'swr'
import { api } from '../config'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function useCompetitionSubmissions(id) {
  const { data, error } = useSWR(
    `${api}/competitions/${id}/submissions`,
    fetcher
  )

  return {
    submissions: data,
    loading: !error && !data,
    error,
  }
}
