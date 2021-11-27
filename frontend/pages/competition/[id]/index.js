import Link from 'next/link'
// import SubmissionList from '../../../components/submission/SubmissionList'
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
  // const { data, error } = useSWR(
  //   () =>
  //     mounted ? `${api}/competitions/${competition.id}/submissions` : null,
  //   fetcher
  // )

  const router = useRouter()
  if (router.isFallback) {
    return <div>loading...</div>
  }

  if (error) return <div>{error}</div>
  if (!data) return <div>loading...</div>
  return (
    <>
      <Container
        className="align-items-center mb-3 position-relative border"
        style={{ height: '10rem', backgroundColor: 'rgba(0,23,56, 0.08)' }}
      >
        <Row>
          <Col
            className="position-absolute"
            style={{ top: '0.5rem', left: '0.8rem' }}
          >
            <h2>{competition.title}</h2>
            <p> {competition.description}</p>
          </Col>
          <Col>
            <div
              className="position-absolute"
              style={{ right: '1rem', top: '1rem' }}
            >
              <p
                className="position-absolute fw-bolder"
                style={{
                  top: '0.12rem',
                  right: '9.07rem',
                  whiteSpace: 'nowrap',
                  fontSize: '0.9rem',
                  letterSpacing: '0.05rem',
                }}
              >
                START-DATE:{' '}
              </p>
              <p>
                {new Intl.DateTimeFormat('en-GB', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                }).format(new Date(competition.startDate))}
              </p>
              <p
                className="position-absolute fw-bolder"
                style={{
                  top: '2.61rem',
                  right: '10rem',
                  whiteSpace: 'nowrap',
                  fontSize: '0.9rem',
                  letterSpacing: '0.05rem',
                }}
              >
                END-DATE:{'  '}
              </p>
              <p>
                {new Intl.DateTimeFormat('en-GB', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                }).format(new Date(competition.endDate))}
              </p>
            </div>
            <div
              className="position-absolute position-relative"
              style={{ right: '1rem', top: '6.5rem' }}
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
      {/* <SubmissionList submissions={data} /> */}
    </>
  )
}

export async function getStaticPaths() {
  const res = await fetch(`${api}/competitions`)

  const competitions = await res.json()

  const paths = competitions.map((competition) => ({
    params: { id: competition.id.toString() },
  }))

  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${api}/competitions/${params.id}`)
  const competition = await res.json()

  return {
    props: {
      competition,
    },
  }
}
