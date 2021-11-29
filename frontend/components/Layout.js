import Meta from './Meta'
import Navigation from './Navigation'
import Container from 'react-bootstrap/Container'
import Footer from './Footer'
import useCompUser from '../hooks/use-comp-user'
import { useUser } from '@auth0/nextjs-auth0'
import checkUser from '../lib/checkUser'

export default function Layout({ children }) {
  const { user, isLoading } = useUser()

  if (!isLoading && user) {
    const userId = checkUser(user)
  }

  return (
    <div
      className={'mytest'}
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Meta />
      <Navigation />
      <Container
        className={'content'}
        style={{
          marginTop: '6rem',
          marginBottom: '4rem',
          flex: 1,
        }}
      >
        <main>{children}</main>
      </Container>
      <Footer />
    </div>
  )
}
