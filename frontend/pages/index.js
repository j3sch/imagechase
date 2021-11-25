import CompetitionList from '../components/CompetitionList'

export default function Home({ competitions }) {
  const myComp = {
    id: 1,
    title: 'Draw me best!',
    short:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores',
    type: 'Painting',
    participants: 40,
    startDate: Date(Date.UTC(2020, 12, 1, 3, 0, 0)),
  }
  return (
    <>
      <h1>Home</h1>
      <CompetitionList
        competitions={[myComp, myComp, myComp, myComp]}
      ></CompetitionList>
      {/* <CompetitionItem competition={myComp}></CompetitionItem> */}
      {/* <CompetitionList competitions={competitions} /> */}
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
