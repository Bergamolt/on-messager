import PropsTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { getUserIdSelector } from '../store/auth/selectors'
import { ROUTE } from './constants'

export const PrivatePage = ({ children }) => {
  const userId = useSelector(getUserIdSelector)

  if (!userId) {
    return <Navigate to={ROUTE.LOGIN} />
  }

  return children
}

PrivatePage.propTypes = {
  children: PropsTypes.node,
}
