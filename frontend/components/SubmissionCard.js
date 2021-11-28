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

export default function SubmissionCard({ submission }) {
  const [rating, setRating] = useState(0)

  const ratingChanged = (newRating) => {
    setRating(newRating)
  }

  const user = {
    judge: false,
  }

  return (
    <Card style={{ borderRadius: '0rem' }}>
      <Row>
        <Col>
          <Card.Img
            variant="top"
            src={`https://source.unsplash.com/350x200/?`}
            style={{ borderRadius: '0rem' }}
          />
        </Col>
        <Col className="position-relative">
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
              {user.judge && (
                <div>
                  <Formik
                    onSubmit={(values) => {
                      const ratingData = {
                        feedback: values.feedback,
                        userId: 1,
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
                          console.log('Success:', data)
                        })
                        .catch((error) => {
                          console.error('Error:', error)
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
                      <Form onSubmit={handleSubmit}>
                        <div
                          className="position-absolute d-flex align-items-center
                    justify-content-between"
                          style={{
                            right: '2rem',
                            left: '2rem',
                            bottom: '8rem',
                          }}
                        >
                          <div>
                            <ReactStars
                              count={5}
                              value={rating}
                              onChange={ratingChanged}
                              size={32}
                              color2={'#ffd700'}
                            />
                          </div>
                          <div>
                            <Button
                              type="submit"
                              variant="outline-secondary"
                              size="md"
                            >
                              SUBMIT
                            </Button>
                          </div>
                        </div>
                        <div
                          className="position-absolute"
                          style={{
                            bottom: '1rem',
                            right: '2rem',
                            left: '2rem',
                          }}
                        >
                          <Form.Group
                            className="mb-3"
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
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              )}
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  )
}
