import useSWR from 'swr'
import { api } from '../config'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function useCompetitions() {
  const { data, error } = useSWR(`${api}/competitions`, fetcher)

  return {
    competitions: data,
    loading: !error && !data,
    error,
  }
}
