import {useContext} from 'react'
import {Navigate, useLocation} from 'react-router-dom'
import {AuthContext} from '../context/auth'
import {ROUTE} from './constants'

const authRoute = [ROUTE.LOGIN, ROUTE.REGISTRATION]

export const AuthPage = ({children}) => {
  const {pathname} = useLocation()
  const {userId} = useContext(AuthContext)

  if (userId && authRoute.includes(pathname)) {
    return <Navigate to={ROUTE.HOME} />
  }

  return children
}
