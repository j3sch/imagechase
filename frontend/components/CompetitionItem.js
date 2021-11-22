import styles from '../styles/Competition.module.css'
import Link from 'next/link'

export default function CompetitionItem({ competition }) {
  return (
    <Link href="/competition/[id]" as={`competition/${competition.id}`}>
      <a className={styles.card}>
        <h3>{competition.title} &rarr;</h3>
        <p>{competition.body}</p>
      </a>
    </Link>
  )
}
