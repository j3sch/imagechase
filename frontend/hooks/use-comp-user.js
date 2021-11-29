import useSWR from 'swr'
import { api } from '../config'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function useCompUser(user) {
  let query = false
  if (typeof user !== 'undefined') {
    query = true
  }

  const { data, error } = useSWR(
    () => (query ? `${api}/users/${user.sub}` : null),
    fetcher
  )

  return {
    compUser: data,
    loading: !error && !data,
    error,
  }
}
