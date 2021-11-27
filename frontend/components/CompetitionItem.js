import Link from 'next/link'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import clsx from 'clsx'

export default function CompetitionItem({ competition, number }) {
  return (
    <Link href="/competition/[id]" as={`competition/${competition.id}`}>
      <Card
        style={cardStyle}
        className={clsx(number % 3 === 1 && 'mx-5', 'my-4')}
      >
        <Card.Img
          variant="top"
          src={`https://source.unsplash.com/300x200/?${competition.type}`}
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
              <div>
                {new Intl.DateTimeFormat('en-GB', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                }).format(new Date(competition.startDate))}
              </div>
            </Container>
          </Card.Text>
          <Link
            href="/competition/[id]/join"
            as={`competition/${competition.id}/join`}
          >
            <Button variant="outline-secondary">JOIN COMPETITION</Button>
          </Link>
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
