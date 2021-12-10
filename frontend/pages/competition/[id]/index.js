import SubmissionList from '../../../components/SubmissionList'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import { useState, useEffect } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import Container from 'react-bootstrap/Container'
import { api } from '../../../config'
import formatDatetime from '../../../lib/dateHelper'
import useCompUser from '../../../hooks/use-comp-user'
import { useUser } from '@auth0/nextjs-auth0'
import useIsUserCompJoined from '../../../hooks/use-is-user-comp-joined'
import useCompetitionParticipantLength from '../../../hooks/use-competition-participants'
import useCompetitionJudges from '../../../hooks/use-competition-judges'
import JoinButton from '../../../components/JoinButton'
import JudgesList from '../../../components/JudgesList'

export default function Competition({ competition }) {
  const { isJoined } = useIsUserCompJoined(competition)
  const { participantLength } = useCompetitionParticipantLength(competition.id)
  const { compJudges } = useCompetitionJudges(competition.id)
  const currentDate = new Date()
  const isCompetitionOver =
    currentDate.toISOString().slice(0, 16) > competition.endDate

  return (
    <>
      <Container className="align-items-center p-4 bg-light bg-opacity-25 border mb-5">
        <Row className={'mb-3'}>
          <Col xs={12} lg={7}>
            <Row
              className="px-3 pb-2 text-center text-lg-start"
              style={{ fontSize: '1.7rem' }}
            >
              {competition ? competition.title : ''}
            </Row>
            <Row
              className={
                'text-uppercase text-decoration-underline fw-light px-3 justify-content-center justify-content-lg-start'
              }
              style={{ letterSpacing: '0.15rem' }}
            >
              {competition ? competition.type : ''}
            </Row>
            <Row className={'p-3 text-center text-lg-start'}>
              {competition ? competition.description : ''}
            </Row>
            <JudgesList compJudges={compJudges} />
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
                  {participantLength ? participantLength : 0}
                </span>
              </Badge>
              <JoinButton isJoined={isJoined} competition={competition} />
            </Row>
            <Row
              className={'justify-content-center justify-content-lg-end mb-1'}
            >
              <span className={'fw-bolder me-1 w-auto'}>Start date:</span>
              {formatDatetime(competition ? competition.startDate : null)}
            </Row>

            <Row
              className={'justify-content-center justify-content-lg-end my-1'}
            >
              <span className={'fw-bolder me-1 w-auto'}>End date:</span>
              {formatDatetime(competition ? competition.endDate : null)}
            </Row>
          </Col>
        </Row>
      </Container>
      <SubmissionList
        competitionId={competition ? competition.id : ''}
        isCompetitionOver={isCompetitionOver}
      />
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
    fallback: 'blocking',
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
