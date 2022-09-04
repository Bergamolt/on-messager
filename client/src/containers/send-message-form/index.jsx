import { TextField } from '@mui/material'
import { useFormik } from 'formik'
import {Button} from 'lau-components'
import classes from './styles.module.css'

export const SendMessageForm = ({ onSendMessage }) => {
  const formik = useFormik({
    initialValues: {
      input: '',
    },
    onSubmit: ({ input }) => {
      onSendMessage(input)

      formik.resetForm()
    },
  })

  return (
    <form className={classes.root} id='form' onSubmit={formik.handleSubmit}>
      <TextField
        className={classes.input}
        id='input'
        autoComplete='off'
        value={formik.values.input}
        onChange={formik.handleChange}
      />
      <Button className={classes.button} type='submit'>
        Send
      </Button>
    </form>
  )
}
