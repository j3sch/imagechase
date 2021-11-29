import Link from 'next/link'
import Image from 'next/image'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import { useUser } from '@auth0/nextjs-auth0'
import checkUser from '../lib/checkUser'

export default function Navigation() {
  const { user, error, isLoading } = useUser()

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" collapseOnSelect>
      <Container className={'text-uppercase'}>
        <Link href="/" passHref>
          <Navbar.Brand>
            <Image
              className={'mt-1'}
              src="/images/logo.png"
              height={26}
              width={200}
              alt="Imagechase"
            />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/" passHref>
              <Nav.Link>Compete</Nav.Link>
            </Link>
            <Link href="/leaderboard" passHref>
              <Nav.Link>Leaderboard</Nav.Link>
            </Link>
            <Link href="/prices" passHref>
              <Nav.Link>Prices</Nav.Link>
            </Link>
          </Nav>
          <Nav className={'align-items-lg-center'}>
            {!user && (
              <a href="/api/auth/login">
                <Button variant="outline-light">SIGN IN/UP</Button>
              </a>
            )}
            {user && (
              <div className="d-flex align-items-center">
                <span className="text-light pe-4">{user.nickname}</span>
                <a href="/api/auth/logout">
                  <Button variant="outline-light">LOGOUT</Button>
                </a>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
