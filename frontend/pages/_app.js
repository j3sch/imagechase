import Layout from '../components/Layout'
import '../styles/scss/globals.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
