const dev = process.env.NODE_ENV !== 'production'

export const api = dev ? '/api' : 'https://api-imagechase.herokuapp.com'
