const dev = process.env.NODE_ENV !== 'production'

export const api = dev ? '/api' : 'https://your_deployment.server.com'
