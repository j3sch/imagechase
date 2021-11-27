import Link from 'next/link'
import SubmissionList from '../../../components/submission/SubmissionList'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import { useState, useEffect } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import { useRouter } from 'next/router'
import useCompetition from '../../../hooks/use-competition'
import useSWR, { SWRConfig } from 'swr'
import { api } from '../../../config'
let competition_url = ''

const fetcher = (url) => fetch(url).then((res) => res.json())
// export const useMounted = () => {
//   const [mounted, setMounted] = useState(false)
//   useEffect(() => setMounted(true), [])
//   return mounted
// }

export default function Competition({ fallback }) {
  // const mounted = useMounted()
  // const router = useRouter()
  // const { id } = router.query
  // const { competition, loading } = useCompetition(id)

  const { data, error } = useSWR(competition_url)
  if (!data) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  }
  const competition = data

  return (
    <SWRConfig value={{ fallback }}>
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
      <SubmissionList competitionId={competition.id} />
    </SWRConfig>
  )
}

export async function getStaticProps(context) {
  const competition_url = `${api}/competitions/${context.params.id}`
  const competition = await fetcher(competition_url)

  return {
    props: {
      fallback: {
        [competition_url]: competition,
      },
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
