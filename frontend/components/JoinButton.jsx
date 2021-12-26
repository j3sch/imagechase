import Button from 'react-bootstrap/Button'
import Link from 'next/link'

export default function JoinButton({ isJoined, competition }) {
  const currentDate = new Date()

  return currentDate.toISOString().slice(0, 16) > competition.endDate ? (
    <Button
      className="w-auto text-uppercase"
      variant="outline-secondary"
      disabled={true}
    >
      Competition is over
    </Button>
  ) : currentDate.toISOString().slice(0, 16) < competition.startDate ? (
      <Button
      className="w-auto text-uppercase"
      variant="outline-secondary"
      disabled={true}
    >
      Not yet started
    </Button>
    ) : isJoined ? (
    <Button className={'w-auto'} variant="outline-secondary" disabled={true}>
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
  )
}
