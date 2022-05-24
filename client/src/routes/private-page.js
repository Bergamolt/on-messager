import {useContext} from 'react'
import {Navigate} from 'react-router-dom'
import {AuthContext} from '../context/auth'
import {ROUTE} from './constants'

export const PrivatePage = ({children}) => {
  const {userId} = useContext(AuthContext)
  console.log(userId)
  if (!userId) {
    return <Navigate to={ROUTE.LOGIN} />
  }

  return children
}
