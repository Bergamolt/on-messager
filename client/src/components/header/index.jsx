import { AppBar } from 'lau-components'
import { Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/auth'
import { Button } from 'lau-components'
import classes from './styles.module.css'

export const Header = () => {
  const dispatch = useDispatch()

  return (
    <AppBar className={classes.root}>
      <Typography variant='h6' noWrap component='a'>
        Chat Online
      </Typography>
      <Button onClick={() => dispatch(logout())}>Log Out</Button>
    </AppBar>
  )
}
