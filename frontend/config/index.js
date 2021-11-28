const dev = process.env.NODE_ENV !== 'production'

export const api = dev
  ? 'http://localhost:3000/api'
  : 'https://imagechaser.herokuapp.com'
