import Meta from './Meta'
import Navigation from './Navigation'
import Container from 'react-bootstrap/Container'
import Header from './Header'

export default function Layout({ children }) {
  return (
    <>
      <Meta />
      <Navigation />
      <Container style={{ marginTop: '4.6rem' }}>
        <main>{children}</main>
      </Container>
    </>
  )
}
