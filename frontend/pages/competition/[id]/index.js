import Link from 'next/link'
import SubmissionList from '../../../components/submission/SubmissionList'
import { api } from '../../../config'
import { useState, useEffect } from 'react'
import useSWR from 'swr'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

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
      <Container
        className="align-items-center mb-3 position-relative"
        style={{ height: '5rem', backgroundColor: 'rgba(0,23,56, 0.1)' }}
      >
        <Row>
          <Col className="ms-4">
            <h2>{competition.title}</h2>
            <p> {competition.description}</p>
          </Col>
          <Col>
            <div
              className="text-text-light-blue rounded fs-5 fw-bold text-center position-absolute"
              style={{
                paddingTop: '0.2rem',
                paddingBottom: '0.2rem',
                paddingLeft: '0.6rem',
                paddingRight: '0.6rem',
                right: '14rem',
                backgroundColor: 'rgba(0,23,56, 0.05)',
              }}
            >
              <i
                className="bi bi-people-fill me-2"
                style={{ fontSize: '1.3rem' }}
              ></i>
              {competition.participantCount}
            </div>
            <Link href="/">
              <Button
                variant="outline-secondary"
                size="md"
                className="m-2 position-absolute"
                style={{ right: '1.2rem' }}
              >
                JOIN COMPETITION
              </Button>
            </Link>
            {new Intl.DateTimeFormat('en-GB', {
              dateStyle: 'medium',
              timeStyle: 'short',
            }).format(new Date(competition.startDate))}
            {new Intl.DateTimeFormat('en-GB', {
              dateStyle: 'medium',
              timeStyle: 'short',
            }).format(new Date(competition.endDate))}
          </Col>
        </Row>
      </Container>
      <SubmissionList submissions={data} />
    </>
  )
}

export async function getStaticProps(context) {
  const res = await fetch(`${api}/competitions/${context.params.id}`)
  const competition = await res.json()

  return {
    props: {
      competition,
    },
  }
}

export async function getStaticPaths() {
  const res = await fetch(`${api}/competitions`)

  const competitions = await res.json()

  const ids = competitions.map((competition) => competition.id)
  const paths = ids.map((id) => ({ params: { id: id.toString() } }))

  return {
    paths,
    fallback: false,
  }
}
