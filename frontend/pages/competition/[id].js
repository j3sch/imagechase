import Link from 'next/link'
import SubmissionList from '../../components/submission/SubmissionList'
import { api } from '../../config'
import { useState, useEffect } from 'react'
import useSWR from 'swr'
import Button from 'react-bootstrap/Button'

export const fetcher = (url) => fetch(url).then((res) => res.json())
export const useMounted = () => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}

export default function Competition({ competition }) {
  const mounted = useMounted()
  const { data, error } = useSWR(
    () =>
      mounted ? `${api}/competitions/${competition.id}/submissions` : null,
    fetcher
  )

  if (mounted) {
    console.log(data)
  }

  if (error) return <div>{error}</div>
  if (!data) return <div>loading...</div>
  return (
    <>
      <div
        className="d-flex align-items-center mb-3"
        style={{ height: '5rem', backgroundColor: 'rgba(131, 59, 236, 0.1)' }}
      >
        <Link href="/">
          <Button variant="outline-secondary" size="md" className="m-2 position-absolute" style={{}}>
            JOIN COMPETITION
          </Button>
        </Link>
        <h2 className="ms-4">{competition.title}</h2>
      </div>
      <SubmissionList submissions={data} />
    </>
  )
}

export async function getStaticProps(context) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${context.params.id}`
  )

  const competition = await res.json()

  return {
    props: {
      competition,
    },
  }
}

export async function getStaticPaths() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)

  const competitions = await res.json()

  const ids = competitions.map((competition) => competition.id)
  const paths = ids.map((id) => ({ params: { id: id.toString() } }))

  return {
    paths,
    fallback: false,
  }
}
