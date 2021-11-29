import Link from 'next/link'
import SubmissionList from '../../../components/SubmissionList'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import { useState, useEffect } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import Container from 'react-bootstrap/Container'
import useCompetition from '../../../hooks/use-competition'
import useSWR, { SWRConfig } from 'swr'
import { api } from '../../../config'
import formatDatetime from '../../../lib/dateHelper'

// const fetcher = (url) => fetch(url).then((res) => res.json())
// export const useMounted = () => {
//   const [mounted, setMounted] = useState(false)
//   useEffect(() => setMounted(true), [])
//   return mounted
// }

export default function Competition({ competition }) {
  // const mounted = useMounted()
  // const { data, error } = useSWR(
  //   () =>
  //     mounted ? `${api}/competitions/${competition.id}/submissions` : null,
  //   fetcher
  // )

  // if (error) return <div>{error}</div>
  // if (!data) return <div>loading...</div>

  return (
    <>
      <Container className="align-items-center p-4 bg-light bg-opacity-25 border mb-5">
        <Row className={'mb-3'}>
          <Col xs={12} lg={7}>
            <Row>
              <h3 className={'text-center text-lg-start'}>
                {competition.title}
              </h3>
            </Row>
            <Row
              className={
                'text-uppercase text-decoration-underline fw-light px-3 justify-content-center justify-content-lg-start'
              }
              style={{ letterSpacing: '0.15rem' }}
            >
              {competition.type}
            </Row>
            <Row className={'p-3 text-center text-lg-start'}>
              {competition.description}
            </Row>
          </Col>
          <Col className={'px-4'}>
            <Row
              className={
                'justify-content-center justify-content-lg-end mt-0 mb-3'
              }
            >
              <Badge
                bg="light"
                className={'text-text-light-blue w-auto p-2 me-2'}
              >
                <i
                  className="bi bi-people-fill me-2"
                  style={{ fontSize: '1.3rem' }}
                />
                <span className={'fs-5 fw-bold'}>
                  {competition.participantCount}
                </span>
              </Badge>
              <Link
                href="/competition/[id]/join"
                as={`/competition/${competition.id}/join`}
              >
                <Button className={'w-auto'} variant="outline-secondary">
                  JOIN COMPETITION
                </Button>
              </Link>
            </Row>
            <Row
              className={'justify-content-center justify-content-lg-end mb-1'}
            >
              <span className={'fw-bolder me-1 w-auto'}>Start date:</span>
              {formatDatetime(competition.startDate)}
            </Row>

            <Row
              className={'justify-content-center justify-content-lg-end my-1'}
            >
              <span className={'fw-bolder me-1 w-auto'}>End date:</span>
              {formatDatetime(competition.endDate)}
            </Row>
          </Col>
        </Row>
      </Container>
      <SubmissionList competitionId={competition.id} />
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

export async function getStaticProps({ params: { id } }) {
  const res = await fetch(`${api}/competitions/${id}`)
  const competition = await res.json()

  return {
    props: {
      competition,
    },
    revalidate: 1,
  }
}
