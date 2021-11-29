import Layout from '../components/Layout'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../styles/scss/globals.scss'
import '../styles/globals.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { UserProvider } from '@auth0/nextjs-auth0'

export default function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  )
}
