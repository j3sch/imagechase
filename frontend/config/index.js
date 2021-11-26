const dev = process.env.NODE_ENV !== 'production'

export const api = dev
  ? 'http://backend:5000'
  : 'https://your_deployment.server.com'
