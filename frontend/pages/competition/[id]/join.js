import Link from 'next/link'
import { api } from '../../../config'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function JoinCompetition({ competition }) {
  return (
    <>
      <Container
        className="align-items-center mb-3 position-relative"
        style={{ height: '5rem', backgroundColor: 'rgba(0,23,56, 0.1)' }}
      ></Container>
    </>
  )
}

export async function getStaticProps(context) {
  const res = await fetch(`${api}/competitions/${context.params.id}`)
  const competition = await res.json()

  return {
    props: {
      competition,
    },
  }
}

export async function getStaticPaths() {
  const res = await fetch(`${api}/competitions`)

  const competitions = await res.json()

  const ids = competitions.map((competition) => competition.id)
  const paths = ids.map((id) => ({ params: { id: id.toString() } }))

  return {
    paths,
    fallback: false,
  }
}
