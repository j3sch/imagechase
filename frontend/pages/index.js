import CompetitionList from '../components/CompetitionList'
import { api } from '../config'
import { useState, useEffect } from 'react'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())
const useMounted = () => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}

export default function Home() {
  const mounted = useMounted()
  const { data, error } = useSWR(
    () => (mounted ? `${api}/competitions` : null),
    fetcher
  )

  if (error) return <div>{error}</div>
  if (!data) return <div>loading...</div>

  return (
    <>
      <h1>Home</h1>
      <CompetitionList competitions={data}></CompetitionList>
    </>
  )
}
