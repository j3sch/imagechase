import useSWR from 'swr'
import { api } from '../config'
import { useUser } from '@auth0/nextjs-auth0'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function useCompUser() {
  const { user, isLoading } = useUser()

  let query = false
  if (!isLoading) {
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
