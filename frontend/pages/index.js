import CompetitionList from '../components/CompetitionList'
import Button from 'react-bootstrap/Button'
import Link from 'next/link'
import useCompUser from '../hooks/use-comp-user'
import { useUser } from '@auth0/nextjs-auth0'
import checkCreateUser from '../lib/checkCreateUser'

export default function Home() {
  const { user, isLoading } = useUser()
  if (!isLoading && user) {
    const userId = checkCreateUser(user)
  }

  const { compUser, loading } = useCompUser()

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <h1>Home</h1>
        {compUser !== undefined && compUser.admin && (
          <div>
            <Link href="/competition/create" passHref>
              <Button variant="outline-secondary">CREATE COMPETITION</Button>
            </Link>
          </div>
        )}
      </div>
      <CompetitionList />
    </>
  )
}
