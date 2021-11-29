import { api } from '../config'

export default async function checkUser(loggedUser) {
  const body = {
    name: loggedUser.nickname,
    email: loggedUser.name,
    sub: loggedUser.sub,
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
