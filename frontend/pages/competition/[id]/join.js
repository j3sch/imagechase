import Link from 'next/link'
import { api } from '../../../config'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import Form from 'react-bootstrap/Form'
import { Formik } from 'formik'
import { useRouter } from 'next/router'
import formatDatetime from '../../../lib/dateHelper'
import useCompUser from '../../../hooks/use-comp-user'
import { useState } from 'react'

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
  const { compUser } = useCompUser()
  const [imageUrl, setImageUrl] = useState('')
  const [imageAlt, setImageAlt] = useState('')

  const handleImageUpload = () => {
    const { files } = document.querySelector('input[type="file"]')

    const formData = new FormData()
    formData.append('file', files[0])
    formData.append('upload_preset', 'xbblyy5g')

    const options = {
      method: 'POST',
      body: formData,
    }

    return fetch(
      'https://api.cloudinary.com/v1_1/dgyi7cmag/image/upload',
      options
    )
      .then((res) => res.json())
      .then((res) => {
        setImageUrl(res.secure_url)
        setImageAlt(`An image of ${res.original_filename}`)
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className={'w-lg-75 mx-auto'}>
      <Container className="align-items-center p-4 bg-light bg-opacity-25 border mb-5">
        <Row className={'mb-3'}>
          <Col xs={12} lg={7}>
            <Row>
              <h3 className={'text-center text-lg-start'}>
                {competition ? competition.title : ''}
              </h3>
            </Row>
            <Row
              className={
                'text-uppercase text-decoration-underline fw-light px-3 mb-2 justify-content-center justify-content-lg-start'
              }
              style={{ letterSpacing: '0.15rem' }}
            >
              {competition ? competition.type : ''}
            </Row>
          </Col>
          <Col>
            <Row
              className={
                'justify-content-center justify-content-lg-end mb-3 px-3'
              }
            >
              <Badge bg="light" className={'text-text-light-blue w-auto p-2 '}>
                <i
                  className="bi bi-people-fill me-2"
                  style={{ fontSize: '1.3rem' }}
                />
                <span className={'fs-5 fw-bold'}>
                  {competition ? competition.participantCount : 0}
                </span>
              </Badge>
            </Row>
            <Row
              className={
                'justify-content-center justify-content-lg-end my-1 px-3'
              }
            >
              <span className={'fw-bolder me-1 w-auto'}>Start date:</span>
              {formatDatetime(competition ? competition.startDate : null)}
            </Row>

            <Row
              className={
                'justify-content-center justify-content-lg-end my-1 px-3'
              }
            >
              <span className={'fw-bolder me-1 w-auto'}>End date:</span>
              {formatDatetime(competition ? competition.endDate : null)}
            </Row>
          </Col>
        </Row>
        <div>
          <h5>Instructions</h5>
          <p>{competition ? competition.instructions : ''}</p>
        </div>
        <div>
          <h5>Rules</h5>
          <p>{competition ? competition.rules : ''}</p>
        </div>
      </Container>
      <Container className={'w-75 mb-5'}>
        <Formik
          onSubmit={(values) => {
            const submissionData = {
              content: 'imagepath',
              description: values.description,
              userId: compUser.id,
              competitionId: parseInt(id),
              imageUrl,
              imageAlt,
            }
            fetch(`${api}/submissions`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(submissionData),
            })
            const participantData = {
              userId: compUser.id,
            }
            fetch(`${api}/competitions/${competition.id}/participants`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(participantData),
            })
              .then((response) => response.json())
              .then(() => {
                router.push('/')
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
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Select image</Form.Label>
                <Form.Control type="file" />
              </Form.Group>
              <Button
                variant="primary"
                type="button"
                className="mb-3"
                onClick={handleImageUpload}
              >
                Submit
              </Button>
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
              <Row className={'justify-content-center'}>
                <Button className={'w-auto'} variant="primary" type="submit">
                  JOIN COMPETITION
                </Button>
              </Row>
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
    revalidate: 1,
  }
}
