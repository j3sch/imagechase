import Meta from '../components/Meta'
import Col from 'react-bootstrap/Col'

export default function about() {
  function handleClickMail(event) {
    event.preventDefault()
    navigator.clipboard.writeText('admin@imagechase.com')
  }

  function handleClickPassword(event) {
    event.preventDefault()
    navigator.clipboard.writeText('Imagechase_2021')
  }

  return (
    <>
      <Meta title="About" />
      <div className="d-flex flex-column align-items-center text-center">
        <h1>About</h1>
        <p className="fs-5 mt-2">
          This is the proof of concept page of a fictitious competiton website
          called IMAGECHASE.
        </p>
        <p className="fs-5">
          To be able to test all functions and features of the site, you need an
          admin login.
        </p>
        <p className="fs-5">
          In the following you will find the login data, which can be copied by
          clicking on the copy button.
        </p>
        <div
          className="bg-light-gray p-2 rounded fs-5 mt-2"
          style={{ width: '17.5rem' }}
        >
          admin@imagechase.com
          <button onClick={handleClickMail} className="border p-2 ms-1 rounded">
            <i className="bi bi-clipboard"></i>
          </button>
        </div>

        <div
          className="bg-light-gray p-2 rounded fs-5 mt-3"
          style={{ width: '13.5rem' }}
        >
          Imagechase_2021
          <button
            onClick={handleClickPassword}
            className="border rounded p-2 ms-1"
          >
            <i className="bi bi-clipboard"></i>
          </button>
        </div>
      </div>
    </>
  )
}
