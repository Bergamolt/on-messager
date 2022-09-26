import PropsTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { getUserIdSelector } from '../store/auth/selectors'
import { ROUTE } from './constants'

const authRoute = [ROUTE.LOGIN, ROUTE.REGISTRATION]

export const AuthPage = ({ children }) => {
  const { pathname } = useLocation()
  const userId = useSelector(getUserIdSelector)

  if (userId && authRoute.includes(pathname)) {
    return <Navigate to={ROUTE.HOME} />
  }

  return children
}

AuthPage.propTypes = {
  children: PropsTypes.node,
}
