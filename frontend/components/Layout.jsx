import Meta from './Meta'
import Navigation from './Navigation'
import Container from 'react-bootstrap/Container'
import Footer from './Footer'


export default function Layout({ children }) {
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
