import Alert from 'react-bootstrap/Alert'

export default function Leaderboard() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: '60vh' }}
    >
      <Alert variant="primary" className="p-4 fs-5">
        This feature is currently in development and will be available in the
        future.
        <i className="bi bi-stars"></i>
      </Alert>
    </div>
  )
}
