import SubmissionCard from './SubmissionCard'
import Stack from 'react-bootstrap/Stack'

export default function SubmissionList({ submissions }) {
  return (
    <Stack gap={4}>
      {submissions.map((submission) => (
        <SubmissionCard key={submission.id} submission={submission} />
      ))}
    </Stack>
  )
}
