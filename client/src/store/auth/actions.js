import axios from 'axios'
import { gatewayFetch } from '../../services/gateway'
import { getUser } from '../user/actions'
import { setAuth } from './slice'

export const logout = () => (dispatch) => {
  localStorage.removeItem('userId')
  localStorage.removeItem('selectedChat')
  localStorage.removeItem('token')
  dispatch({ type: 'auth/LOGOUT' })
}

export const login = (username, password) => (dispatch) => {
  try {
    gatewayFetch('/api/auth/login', { username, password }).then(({ data }) => {
      dispatch(setAuth(data))
      dispatch(getUser(data.userId))
    })
  } catch (err) {
    console.error(err)
  }
}

export const register = (username, password) => (dispatch) => {
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
      .then(({ data }) => {
        dispatch(setAuth(data))
      })
  } catch (err) {
    console.error(err)
  }
}
