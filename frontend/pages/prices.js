import Alert from 'react-bootstrap/Alert'

export default function Prices() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: '60vh' }}
    >
      <Alert variant="primary" className="p-4">
        <p className="m-0 fs-5">Prices is currently in development </p>
        <p className="m-0 fs-5">
          and will be available in the future.<i class="bi bi-stars"></i>
        </p>
      </Alert>
    </div>
  )
}
