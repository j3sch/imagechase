import Link from 'next/link'
import Button from 'react-bootstrap/Button'

export default function Footer() {
  return (
    <footer className={'bg-dark text-center text-light mt-5'}>
      <div className={'container p-3'}>
        <section className={'mb-1'}>
          <i
            className={'bi bi-instagram px-3'}
            style={{ fontSize: '1.3rem' }}
          ></i>
          <i
            className={'bi bi-linkedin px-3'}
            style={{ fontSize: '1.3rem' }}
          ></i>
          <i
            className={'bi bi-twitter px-3'}
            style={{ fontSize: '1.3rem' }}
          ></i>

          <Link
            href="https://github.com/J3ns6/it-competition-platform"
            passHref
          >
            <i
              className={'bi bi-github px-2'}
              style={{ fontSize: '1.3rem' }}
            ></i>
          </Link>
        </section>
      </div>

      {/* <!-- Section: Text --> */}
      <section className={'px-5'}>
        <p>
          This is a proof of concept website created as part of the Internet
          Technologies module at the University of the West of Scotland. It is a
          website on which different competitions for pictures can be held.
        </p>
      </section>

      {/* <!-- Copyright --> */}
      <div
        className={'text-center p-2'}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
      >
        © 2021 Copyright IMAGECHASE
      </div>
    </footer>
  )
}
