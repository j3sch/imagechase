import useSWR from 'swr'
import { api } from '../config'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function useCompetitionJudges(id) {
  let query = false
  if (typeof id !== 'undefined') {
    query = true
  }
  const { data, error } = useSWR(`${api}/competitions/${id}/judge`, fetcher)

  return {
    compJudges: data,
    loading: !error && !data,
    error,
  }
}
