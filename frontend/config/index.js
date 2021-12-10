const dev = process.env.NODE_ENV !== 'production'

export const api = dev
  ? 'http://localhost:3000/backend'
  : 'https://backend-iamgechase.herokuapp.com'
