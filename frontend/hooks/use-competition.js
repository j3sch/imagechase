import useSWR from 'swr'
import { api } from '../config'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function useCompetition(id) {
  const { data, error } = useSWR(`${api}/competitions/${id}`, fetcher)

  return {
    competition: data,
    loading: !error && !data,
    error,
  }
}
