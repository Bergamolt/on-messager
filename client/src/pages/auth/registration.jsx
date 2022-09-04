import { useFormik } from 'formik'
import axios from 'axios'

import classes from './styles.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { Paper, TextField, Typography } from '@mui/material'
import { ROUTE } from '../../routes/constants'
import { Button } from 'lau-components'

export const Registration = () => {
  const navigate = useNavigate()

  const handlerRegistration = async (username, password) => {
    try {
      const { data, status } = await axios.post(
        '/api/auth/registration',
        { username, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      console.log(data.message)

      if (status === 200) {
        setTimeout(() => {
          navigate('/login')
        }, 1000)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      rePassword: '',
    },
    onSubmit: ({ username, password, rePassword }) => {
      if (password === rePassword) {
        handlerRegistration(username, password)
      }
    },
  })

  return (
    <div className={classes.root}>
      <Paper className={classes.container}>
        <Typography className={classes.title} variant='h3'>
          Registration
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <TextField
            type='text'
            id='username'
            placeholder='Username'
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
          <TextField
            type='password'
            id='rePassword'
            placeholder='Repeat password'
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            autoComplete='true'
            required
          />
          <Button type='submit'>Registration</Button>
          <Typography variant='p'>
            Login to an existing <Link to={ROUTE.LOGIN}>account</Link>?
          </Typography>
        </form>
      </Paper>
    </div>
  )
}
