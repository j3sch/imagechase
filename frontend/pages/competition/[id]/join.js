import Link from 'next/link'
import { api } from '../../../config'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion'
import Form from 'react-bootstrap/Form'
import { Formik } from 'formik'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const validate = (values) => {
  const errors = {}
  // description
  if (!values.description) {
    errors.description = 'Required'
  }

  return errors
}

export default function JoinCompetition({ competition }) {
  const router = useRouter()
  const { id } = router.query

  return (
    <div className={'w-75 mx-auto'}>
      <Container className="align-items-center p-4 bg-light bg-opacity-25 mb-5">
        <h3>{competition.title}</h3>
        <div className="d-flex text-text-light-blue rounded fs-5 fw-bold text-center">
          <i
            className="bi bi-people-fill me-2"
            style={{ fontSize: '1.3rem' }}
          />
          {competition.participantCount}
        </div>
        <div>
          <h5>Instructions</h5>
          <p>{competition.instructions}</p>
        </div>
        <div>
          <h5>Rules</h5>
          <p>{competition.rules}</p>
        </div>
      </Container>
      <Container className={'w-75 mb-5'}>
        <Formik
          onSubmit={(values) => {
            const submissionData = {
              content: 'imagepath',
              description: values.description,
              userId: 1,
              competitionId: parseInt(id),
            }
            console.log(submissionData)
            fetch(`${api}/submissions`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(submissionData),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log('Success:', data)
                router.push('/')
              })
              .catch((error) => {
                console.error('Error:', error)
              })
          }}
          validate={validate}
          initialValues={{
            description: '',
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
            <Form noValidate onSubmit={handleSubmit}>
              {/* title */}
              <Form.Group className={'mb-3'} controlId="content">
                <Form.Label>Submission file</Form.Label>
                <Form.Control type="file" name="content" disabled />
                <Form.Text className="text-muted">
                  In the future you will be able to add your submission here.
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              {/* description */}
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  type="text"
                  placeholder="Describe your submission in a view sentences."
                  style={{ height: '200px' }}
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.description && errors.description}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>

              <Button variant="primary" type="submit">
                JOIN COMPETITION
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </div>
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
  }
}
