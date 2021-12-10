import Card from 'react-bootstrap/Card'
import Link from 'next/link'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import Form from 'react-bootstrap/Form'
import ReactStars from 'react-stars'
import { Formik } from 'formik'
import { useState } from 'react'
import { api } from '../config'
import { useUser } from '@auth0/nextjs-auth0'
import useCompUser from '../hooks/use-comp-user'
import useCompetitionJudges from '../hooks/use-competition-judges'

export default function SubmissionCard({ submission }) {
  const [isUserJudge, setUserJudge] = useState(false)
  const { compUser, loading } = useCompUser()
  const { compJudges } = useCompetitionJudges(submission.competitionId)

  return (
    <Card className="rounded-0">
      <Row>
        <Col xs={12} lg={6}>
          <Card.Img
            variant="top"
            src={submission.imageUrl}
            alt={submission.imageAlt}
          />
        </Col>
        <Col xs={12} lg={6}>
          <Card.Body style={{ padding: '1.5rem' }}>
            <Row className={'justify-content-between'}>
              <Card.Title className="fw-bolder w-auto">
                {submission.User.name}
              </Card.Title>
              <Container className={'w-auto m-0'}>
                <Card.Text
                  style={{ borderRadius: '5px' }}
                  className="fs-5 text-text-lighter-blue bg-lighter-blue p-1 mb-4"
                >
                  Rating:{'   '}
                  <Badge
                    className="p-2 text-text-light-blue text-center"
                    bg="light-blue"
                  >
                    {submission.rating}
                  </Badge>
                </Card.Text>
              </Container>
            </Row>
            <div style={{ minHeight: '5.5rem' }}>
              <Card.Text as="Row" className="mt-3 h">
                {submission.description}
              </Card.Text>
            </div>
            <Row>{RatingForm(compUser, submission, compJudges)}</Row>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  )
}

const RatingForm = (compUser, submission, compJudges) => {
  const [rating, setRating] = useState(0)
  const [isSubmited, setSubmited] = useState(false)

  const ratingChanged = (newRating) => {
    setRating(newRating)
  }

  return (
    compJudges &&
    compUser &&
    compJudges.Judge.map(
      (judge) =>
        judge.User.id === compUser.id &&
        !isSubmited && (
          <Formik
            onSubmit={(values) => {
              const ratingData = {
                feedback: values.feedback,
                userId: compUser.id,
                rating,
              }
              fetch(`${api}/submissions/${submission.id}/rating`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(ratingData),
              })
                .then((response) => response.json())
                .then((data) => {
                  console.log(data)
                  setSubmited(true)
                })
            }}
            initialValues={{
              feedback: '',
            }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors,
            }) => (
              <Form className={'mt-3'} onSubmit={handleSubmit}>
                <Row className="d-flex align-items-center justify-content-between">
                  <Col>
                    <ReactStars
                      count={5}
                      value={rating}
                      onChange={ratingChanged}
                      size={32}
                      color2={'#ffd700'}
                    />
                  </Col>
                  <Col xs="auto">
                    <Button type="submit" variant="outline-secondary" size="md">
                      SUBMIT
                    </Button>
                  </Col>
                </Row>
                <Form.Group
                  className="my-2"
                  controlId="exampleForm.ControlTextarea1"
                >
                  {/* <Form.Label>Example textarea</Form.Label> */}
                  <Form.Control
                    as="textarea"
                    type="text"
                    placeholder="Short description on competition card"
                    name="feedback"
                    value={values.feedback}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.feedback && errors.feedback}
                    rows={2}
                  />
                </Form.Group>
              </Form>
            )}
          </Formik>
        )
    )
  )
}
