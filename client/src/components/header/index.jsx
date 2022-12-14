import cx from 'classnames'
import classes from './styles.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/auth/actions'
import { getUsernameSelector } from '../../store/user/selectors'
import socket from '../../services/socket'
import { USER_OFFLINE } from '../../services/socket/constants'

export const Header = () => {
  const dispatch = useDispatch()
  const username = useSelector(getUsernameSelector)

  return (
    <header className={cx('app-bar', classes.root)}>
      <a className='h6'>Chat Online</a>
      <button
        className='button'
        onClick={() => {
          dispatch(logout())
          socket.emit(USER_OFFLINE, { username })
        }}
      >
        Log Out
      </button>
    </header>
  )
}
