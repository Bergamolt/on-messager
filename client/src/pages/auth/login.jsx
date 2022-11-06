import { useFormik } from 'formik'
import cx from 'classnames'

import classes from './styles.module.css'
import { TextField, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { ROUTE } from '../../routes/constants'
import { Button, Paper } from 'lau-ui'
import { useDispatch } from 'react-redux'
import { login } from '../../store/auth/actions'

export const Login = () => {
  const dispatch = useDispatch()

  const handlerLogin = async (username, password) => {
    dispatch(login(username, password))
  }

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: ({ username, password }) => {
      handlerLogin(username, password)
    },
  })

  return (
    <div className={classes.root}>
      <Paper className={classes.container}>
        <h3 className={cx('h3', classes.title)}>Login</h3>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <TextField
            type='text'
            id='username'
            placeholder='Email address'
            value={formik.values.username}
            onChange={formik.handleChange}
            required
          />
          <TextField
            type='password'
            id='password'
            placeholder='Password'
            value={formik.values.password}
            onChange={formik.handleChange}
            autoComplete='true'
            required
          />
          <Button type='submit'>Login</Button>
          <Typography variant='p'>
            Want to register an <Link to={ROUTE.REGISTRATION}>account</Link>?
          </Typography>
        </form>
      </Paper>
    </div>
  )
}
