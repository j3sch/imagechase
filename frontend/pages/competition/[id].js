import Link from 'next/link'

export default function Competition({ competition }) {
  return (
    <>
      <h1>{competition.title}</h1>
      <p>{competition.body}</p>
      <br />
      <Link href="/">Go Back</Link>
    </>
  )
}

export async function getStaticProps(context) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${context.params.id}`
  )

  const competition = await res.json()

  return {
    props: {
      competition,
    },
  }
}

export async function getStaticPaths() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)

  const competitions = await res.json()

  const ids = competitions.map((competition) => competition.id)
  const paths = ids.map((id) => ({ params: { id: id.toString() } }))

  return {
    paths,
    fallback: false,
  }
}
