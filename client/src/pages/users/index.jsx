import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUsers } from '../../store/users'

export const Users = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('usersPage____')
    dispatch(getUsers())
  }, [])

  return <div>users</div>
}
