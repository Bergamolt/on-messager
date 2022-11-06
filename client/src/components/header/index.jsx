import classes from './styles.module.css'
import { useDispatch } from 'react-redux'
import { Button, AppBar } from 'lau-ui'
import { logout } from '../../store/auth/actions'

export const Header = () => {
  const dispatch = useDispatch()

  return (
    <AppBar className={classes.root}>
      <a className='h6'>Chat Online</a>
      <Button onClick={() => dispatch(logout())}>Log Out</Button>
    </AppBar>
  )
}
