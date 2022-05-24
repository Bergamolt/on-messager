import { useContext } from 'react'
import { AuthContext } from '../../context/auth'
import classes from './styles.module.css'

export const Header = () => {
  const {logout} = useContext(AuthContext)

  return (
    <div className={classes.root}>
      <span className={classes.logo}>Chat Online</span>
      <button onClick={logout}>Log Out</button>
    </div>
  )
}
