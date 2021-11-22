import CompetitionList from '../components/CompetitionList'
import utilStyles from '../styles/utils.module.css'

export default function Home({ competitions }) {
  return (
    <>
      <h1>Home</h1>
      <CompetitionList competitions={competitions} />
    </>
  )
}

export async function getStaticProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=6')
  const competitions = await res.json()

  return {
    props: {
      competitions,
    },
  }
}
