import CompetitionItem from './CompetitionItem'
import useCompetitions from '../hooks/use-competitions'
import Spinner from 'react-bootstrap/Spinner'

export default function CompetitionList() {
  const { competitions, loading } = useCompetitions()

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  }

  return (
    <div className={'d-flex flex-wrap justify-content-center'}>
      {competitions.map((competition, number) => (
        <CompetitionItem
          key={competition}
          competition={competition}
          number={number}
        />
      ))}
    </div>
  )
}
