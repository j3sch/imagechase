import CompetitionItem from './CompetitionItem'

export default function CompetitionList({ competitions }) {
  return (
    <div className={'d-flex flex-wrap justify-content-center'}>
      {competitions.map((competition) => (
        <CompetitionItem key={competition} competition={competition} />
      ))}
    </div>
  )
}
