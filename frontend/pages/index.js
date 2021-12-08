import CompetitionList from '../components/CompetitionList'
import Button from 'react-bootstrap/Button'
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0'
import useCompUser from '../hooks/use-comp-user'
import checkCreateUser from '../lib/checkCreateUser'
import { useEffect } from 'react'

export default function Home() {
  const { user, isLoading } = useUser()
  let ourUser = undefined
  if (!isLoading && user) {
    const ourUser = checkCreateUser(user)
  }

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <h1>Home</h1>
        {ourUser !== undefined && ourUser.judge && (
          <div>
            <Link href="/competition/create" passHref>
              <Button variant="outline-secondary">CREATE COMPETITION</Button>
            </Link>
          </div>
        )}
      </div>
      <CompetitionList ourUser={ourUser} />
    </>
  )
}
