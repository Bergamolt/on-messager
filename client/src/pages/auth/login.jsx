import {useFormik} from 'formik'
import axios from 'axios'

import classes from './styles.module.css'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth'

export const Login = () => {
  const {login} = useContext(AuthContext)

  const handlerLogin = async (email, password) => {
    try {
      const {data} = await axios.post(
        '/api/auth/login',
        {email, password},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (data) {
        login(data.userId, data.token)
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
    onSubmit: ({email, password}) => {
      handlerLogin(email, password)
    },
  })

  return (
    <div className={classes.root}>
      <h1>Login</h1>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <input
          type="email"
          id="email"
          placeholder="Email address"
          value={formik.values.email}
          onChange={formik.handleChange}
          required
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          autoComplete="true"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
