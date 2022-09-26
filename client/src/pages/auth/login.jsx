import { useFormik } from 'formik'
import axios from 'axios'
import cx from 'classnames'

import classes from './styles.module.css'
import { TextField, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { ROUTE } from '../../routes/constants'
import { Button, Paper } from 'lau-ui'
import { useDispatch } from 'react-redux'
import { login } from '../../store/auth'

export const Login = () => {
  const dispatch = useDispatch()

  const handlerLogin = async (username, password) => {
    try {
      const { data } = await axios.post(
        '/api/auth/login',
        { username, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (data) {
        const { userId, token, username } = data
        dispatch(login({ userId, token, username }))
      }
    } catch (err) {
      console.error(err)
    }
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
