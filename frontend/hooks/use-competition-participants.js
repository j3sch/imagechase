import useSWR from 'swr'
import { api } from '../config'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function useCompetitionParticipantLength(id) {
  let query = false
  if (typeof id !== 'undefined') {
    query = true
  }
  const { data, error } = useSWR(
    () => (query ? `${api}/competitions/${id}/participants` : null),
    fetcher
  )

  return {
    participantLength: data,
    loading: !error && !data,
    error,
  }
}
