import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'

import classes from './styles.module.css'
import { Link } from 'react-router-dom'
import { Paper, TextField, Typography } from '@mui/material'
import { ROUTE } from '../../routes/constants'
import { Button } from 'lau-ui'
import { register } from '../../store/auth/actions'

export const Registration = () => {
  const dispatch = useDispatch()

  const handlerRegistration = async (username, password) => {
    dispatch(register(username, password))
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
