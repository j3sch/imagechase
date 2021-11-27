import Card from 'react-bootstrap/Card'
import Link from 'next/link'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'

export default function SubmissionCard({ submission }) {
  return (
    <Link href="/competition/[id]" as={`competition/${submission.id}`}>
      <Card>
        <Row>
          <Col>
            <Card.Img
              variant="top"
              src={`https://source.unsplash.com/350x200/?`}
            />
          </Col>
          <Col>
            <Card.Body style={{ padding: '1.5rem' }}>
              <div>
                <Card.Title className="fw-bolder mt-2">
                  {submission.user.name}
                </Card.Title>
                <div className="position-absolute end-0 top-0 me-4 mt-4">
                  <Card.Text
                    style={{ borderRadius: '5px' }}
                    className=" fs-5 text-text-lighter-blue bg-lighter-blue p-1 mb-4"
                  >
                    Rating:{'   '}
                    <Badge
                      className="p-2 text-text-light-blue text-center"
                      bg="light-blue"
                    >
                      {submission.rating}
                    </Badge>
                  </Card.Text>
                </div>
                <Card.Text className="mt-3">
                  <p>{submission.description}</p>
                </Card.Text>
                <Button
                  variant="primary"
                  size="md"
                  className="position-absolute bottom-0 mw-100 d-inline-block"
                  style={{
                    marginBottom: '2rem',
                    marginRight: '2rem',
                  }}
                >
                  Rate Submision
                </Button>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Link>
  )
}

// const cardStyle = {
//   borderRadius: '10px',
// }
