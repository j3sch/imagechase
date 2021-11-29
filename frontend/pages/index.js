import CompetitionList from '../components/CompetitionList'
import Button from 'react-bootstrap/Button'
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0'
import useCompUser from '../hooks/use-comp-user'

export default function Home() {
  const { user, isLoading } = useUser()
  const { compUser, loading } = useCompUser(user)

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <h1>Home</h1>
        {compUser !== undefined && compUser.judge && (
          <div>
            <Link href="/competition/create">
              <Button variant="outline-secondary">CREATE COMPETITION</Button>
            </Link>
          </div>
        )}
      </div>
      <CompetitionList></CompetitionList>
    </>
  )
}
