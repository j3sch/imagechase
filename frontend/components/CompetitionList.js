import CompetitionItem from './CompetitionItem'

export default function CompetitionList({ competitions }) {
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
