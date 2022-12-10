import axios from 'axios'

const instance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
})

instance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem('token'))

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

instance.interceptors.response.use(
  async (response) => response,
  async (error) => {
    if (error?.response?.status === 401) {
      localStorage.clear()
      window.location.reload()
    }

    if (error?.response?.status === 403 && error?.response?.data?.message === 'Token_expired') {
      try {
        const { data } = await instance.post('/api/auth/refresh', {
          refreshToken: JSON.parse(localStorage.getItem('refreshToken')),
        })

        localStorage.setItem('token', JSON.stringify(data.token))
        localStorage.setItem('refreshToken', JSON.stringify(data.refreshToken))

        return instance(error.config)
      } catch (err) {
        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  }
)

export default instance
