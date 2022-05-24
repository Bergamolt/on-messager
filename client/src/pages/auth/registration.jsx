import {useFormik} from 'formik'
import axios from 'axios'

import classes from './styles.module.css'
import {useNavigate} from 'react-router-dom'

export const Registration = () => {
  const navigate = useNavigate()

  const handlerRegistration = async (email, password) => {
    try {
      const {data, status} = await axios.post(
        '/api/auth/registration',
        {email, password},
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
      email: '',
      password: '',
      rePassword: '',
    },
    onSubmit: ({email, password, rePassword}) => {
      if (password === rePassword) {
        handlerRegistration(email, password)
      }
    },
  })

  return (
    <div className={classes.root}>
      <h1>Registration</h1>
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
        <input
          type="password"
          id="rePassword"
          placeholder="Repeat password"
          value={formik.values.rePassword}
          onChange={formik.handleChange}
          autoComplete="true"
          required
        />
        <button type="submit">Registration</button>
      </form>
    </div>
  )
}
