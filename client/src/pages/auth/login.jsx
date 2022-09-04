import { useFormik } from 'formik'
import axios from 'axios'

import classes from './styles.module.css'
import { Paper, TextField, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { ROUTE } from '../../routes/constants'
import { Button } from 'lau-components'
import { useDispatch } from 'react-redux'
import { login } from '../../store/auth'

export const Login = () => {
  const dispatch = useDispatch()

  const handlerLogin = async (email, password) => {
    try {
      const { data } = await axios.post(
        '/api/auth/login',
        { email, password },
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
      email: '',
      password: '',
    },
    onSubmit: ({ email, password }) => {
      handlerLogin(email, password)
    },
  })

  return (
    <div className={classes.root}>
      <Paper className={classes.container}>
        <Typography className={classes.title} variant='h3'>
          Login
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <TextField
            type='email'
            id='email'
            placeholder='Email address'
            value={formik.values.email}
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
