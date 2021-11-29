import Layout from '../components/Layout'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../styles/scss/globals.scss'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
