import SubmissionCard from './SubmissionCard'
import Stack from 'react-bootstrap/Stack'
import Spinner from 'react-bootstrap/Spinner'
import useCompetitionSubmissions from '../../hooks/use-competition-submissions'

export default function SubmissionList({ submissions }) {
  return (
    <Stack gap={4}>
      {submissions.map((submission) => (
        <SubmissionCard key={submission} submission={submission} />
      ))}
    </Stack>
  )
}
