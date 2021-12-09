import { useUser } from '@auth0/nextjs-auth0'
import { api } from '../config'

export default async function checkCreateUser(user) {
  const body = {
    name: user.nickname,
    sub: user.sub,
  }

  const res = await fetch(`${api}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data)
    })
    .catch((error) => {
      console.error(error)
    })
  return res
}
