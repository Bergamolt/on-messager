import axios from 'axios'
import { gatewayFetch } from '../../services/gateway'
import { getUser } from '../user/actions'

export const logout = () => {
  try {
    gatewayFetch('/api/auth/logout').then(() => {
      localStorage.clear()
      window.location.reload()
    })
  } catch (err) {
    console.error(err)
  }
}

export const login = (username, password) => (dispatch) => {
  try {
    gatewayFetch('/api/auth/login', { username, password }).then(({ data }) => {
      localStorage.setItem('token', JSON.stringify(data.token))
      localStorage.setItem('refreshToken', JSON.stringify(data.refreshToken))

      dispatch(getUser(data.userId))
    })
  } catch (err) {
    console.error(err)
  }
}

export const register = (username, password) => () => {
  try {
    axios
      .post(
        '/api/auth/registration',
        { username, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      // eslint-disable-next-line no-empty-pattern
      .then(({}) => {
        // dispatch(setAuth(data))
      })
  } catch (err) {
    console.error(err)
  }
}
