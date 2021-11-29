import Meta from './Meta'
import Navigation from './Navigation'
import Container from 'react-bootstrap/Container'
import Header from './Header'
import useCompUser from '../hooks/use-comp-user'
import { useUser } from '@auth0/nextjs-auth0'
import checkUser from '../lib/checkUser'

export default function Layout({ children }) {
  const { user, isLoading } = useUser()

  if (!isLoading && user) {
    const userId = checkUser(user)
  }

  return (
    <>
      <Meta />
      <Navigation />
      <Container
        style={{
          marginTop: '6rem',
        }}
      >
        <main>{children}</main>
      </Container>
    </>
  )
}
