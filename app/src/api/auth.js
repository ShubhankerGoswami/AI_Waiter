import client from './client'

export const authApi = {
  async login({ email, password }) {
    const res = await client.post('/auth/login', { email, password })
    return res.data
  },

  async register({ name, email, password, restaurantName }) {
    const res = await client.post('/auth/register', {
      full_name: name,
      email,
      password,
      restaurant_name: restaurantName,
    })
    return res.data
  },

  async googleAuth(credential) {
    const res = await client.post('/auth/google', { credential })
    return res.data
  },

  async getMe() {
    const res = await client.get('/auth/me')
    return res.data
  },
}
