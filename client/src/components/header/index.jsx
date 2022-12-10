import cx from 'classnames'
import classes from './styles.module.css'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../store/auth/actions'
import { ROUTE } from '../../routes/constants'

export const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <header className={cx('app-bar', classes.root)}>
      <a className='h6'>Chat Online</a>
      <button
        className='button'
        onClick={() => {
          dispatch(logout())
          navigate(ROUTE.LOGIN)
        }}
      >
        Log Out
      </button>
    </header>
  )
}
