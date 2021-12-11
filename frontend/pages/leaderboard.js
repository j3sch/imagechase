import Alert from 'react-bootstrap/Alert'

export default function Leaderboard() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: '60vh' }}
    >
      <Alert variant="primary" className="p-4">
        <p className="m-0 fs-5">Leaderboard is currently in development </p>
        <p className="m-0 fs-5">
          and will be available in the future. <i className="bi bi-stars"></i>
        </p>
      </Alert>
    </div>
  )
}
