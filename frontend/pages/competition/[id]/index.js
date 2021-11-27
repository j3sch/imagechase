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

export const useMounted = () => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}

export default function Competition() {
  const mounted = useMounted()
  const router = useRouter()
  const { id } = router.query

  const { competition, loading } = mounted
    ? useCompetition(id)
    : { competition: null, loading: true }

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  }

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
      <SubmissionList competitionId={competition.id} />
    </>
  )
}

// export async function getStaticProps(context) {
//   const COMPETITION_URL = `${api}/competitions/${context.params.id}`
//   const res = await fetch(COMPETITION_URL)
//   const competition = await res.json()

//   return {
//     props: {
//       fallback: {
//         [COMPETITION_URL]: competition,
//       },
//     },
//   }
// }

// export async function getStaticPaths() {
//   const res = await fetch(`${api}/competitions`)

//   const competitions = await res.json()

//   const ids = competitions.map((competition) => competition.id)
//   const paths = ids.map((id) => ({ params: { id: id.toString() } }))

//   return {
//     paths,
//     fallback: true,
//   }
// }
