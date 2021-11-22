import styles from '../styles/Competition.module.css'
import CompetitionItem from './CompetitionItem'

export default function CompetitionList({ competitions }) {
  return (
    <div className={styles.grid}>
      {competitions.map((competition) => (
        <CompetitionItem key={competition} competition={competition} />
      ))}
    </div>
  )
}
