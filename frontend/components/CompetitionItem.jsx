import Link from 'next/link'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import formatDatetime from '../lib/dateHelper'
import clsx from 'clsx'
import useIsUserCompJoined from '../hooks/use-is-user-comp-joined'
export default function CompetitionItem({ competition }) {
  const { isJoined } = useIsUserCompJoined(competition)

  return (
    <Link
      href="/competition/[id]"
      as={`competition/${competition.id}`}
      passHref
    >
      <Card
        style={cardStyle}
        className={'competitionCard m-3'}
        // className={ clsx(number % 3 === 1 && 'mx-5', 'my-4')}
      >
        <Card.Img
          variant="top"
          height={265}
          src={competition.imageUrl}
          alt={competition.imageAlt}
          style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
        />
        <Card.Body className={'text-center'}>
          <Card.Subtitle
            className={'text-uppercase text-decoration-underline fw-light mb-2'}
            style={{ letterSpacing: '0.15rem' }}
          >
            {competition.type}
          </Card.Subtitle>
          <Card.Title>{competition.title}</Card.Title>
          <Card.Text>{competition.description}</Card.Text>
          <Card.Text>
            <Container className={'text-center'}>
              <div
                className={'text-uppercase fw-bolder mb-2'}
                style={{ fontSize: '0.9rem', letterSpacing: '0.05rem' }}
              >
                Starts at
              </div>
              <div>{formatDatetime(competition.startDate)}</div>
            </Container>
          </Card.Text>
          {isJoined ? (
            <Button
              className={'w-auto'}
              variant="outline-secondary"
              disabled={true}
            >
              ALREADY JOINT
            </Button>
          ) : (
            <Link
              href="/competition/[id]/join"
              as={`/competition/${competition.id}/join`}
              passHref
            >
              <Button className={'w-auto'} variant="outline-secondary">
                JOIN COMPETITION
              </Button>
            </Link>
          )}
        </Card.Body>
      </Card>
    </Link>
  )
}

const cardStyle = {
  minWidth: '25rem',
  maxWidth: '25rem',
  borderRadius: '10px',
}
