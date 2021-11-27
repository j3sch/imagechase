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
import { useRouter } from 'next/router'

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

  const router = useRouter()
  if (router.isFallback) {
    return <div>loading...</div>
  }

  if (mounted) {
    console.log(data)
  }

  if (error) return <div>{error}</div>
  if (!data) return <div>loading...</div>
  return (
    <>
      <Container
        className="align-items-center mb-3 position-relative"
        style={{ height: '13rem', backgroundColor: 'rgba(0,23,56, 0.1)' }}
      >
        <Row>
          <Col className="ms-4">
            <h2>{competition.title}</h2>
            <p> {competition.description}</p>
          </Col>
          <Col>
            <div
              className="position-absolute"
              style={{ right: '1rem', top: '1rem' }}
            >
              <p>
                START-DATE:{' '}
                {new Intl.DateTimeFormat('en-GB', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                }).format(new Date(competition.startDate))}
              </p>
              <p>
                END-DATE:{'  '}
                {new Intl.DateTimeFormat('en-GB', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                }).format(new Date(competition.endDate))}
              </p>
            </div>
            <div
              className="position-absolute position-relative"
              style={{ right: '1rem', top: '9rem' }}
            >
              <div
                className="d-flex text-text-light-blue rounded fs-5 fw-bold text-center position-absolute"
                style={{
                  paddingTop: '0.2rem',
                  paddingBottom: '0.2rem',
                  paddingLeft: '0.6rem',
                  paddingRight: '0.6rem',
                  right: '11.5rem',
                  backgroundColor: 'rgba(0,23,56, 0.05)',
                }}
              >
                <i
                  className="bi bi-people-fill me-2"
                  style={{ fontSize: '1.3rem' }}
                />
                {competition.participantCount}
              </div>
              <Link href="/">
                <Button variant="outline-secondary" size="md">
                  JOIN COMPETITION
                </Button>
              </Link>
            </div>
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
    fallback: true,
  }
}
