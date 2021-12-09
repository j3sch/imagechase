import { useUser } from '@auth0/nextjs-auth0'

export default function useIsUserCompJoined(competition) {
  let isJoined = false
  const { user, isLoading } = useUser()

  if (!isLoading && user && competition) {
    for (let i = 0; i < competition.Submission.length; i++) {
      if (competition.Submission[i].User.sub === user.sub) {
        isJoined = true
        break
      }
    }
  }
  return { isJoined }
}
