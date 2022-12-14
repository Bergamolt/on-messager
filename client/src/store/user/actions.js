import { gatewayFetch } from '../../services/gateway'
import { GET_USER } from '../../services/gateway/config'
import { actions } from './slice'

export const { setUserOnline, setUserOffline, setUser } = actions

export const getUser = (userId) => (dispatch) => {
  gatewayFetch(GET_USER, { userId }).then((response) => {
    dispatch(setUser(response.data))
  })
}
