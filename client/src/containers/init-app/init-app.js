import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../store/user/actions'
import { getUserIdSelector } from '../../store/user/selectors'

export function InitApp({ children }) {
  const dispatch = useDispatch()
  const userId = useSelector(getUserIdSelector)

  useEffect(() => {
    if (userId) {
      dispatch(getUser(userId))
    }
  }, [userId])

  return children
}
