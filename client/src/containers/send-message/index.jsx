import classes from './styles.module.css'

import PropTypes from 'prop-types'
import { TextField } from '@mui/material'
import { useFormik } from 'formik'
import { Button } from 'lau-ui'
import { MdSend } from 'react-icons/md'

export const SendMessage = ({ onSendMessage }) => {
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
      <div className={classes.send}>
        <TextField
          className={classes.input}
          id='input'
          autoComplete='off'
          value={formik.values.input}
          onChange={formik.handleChange}
          placeholder='Message'
          size='small'
        />
      </div>
      <Button className={classes.button} type='submit'>
        <MdSend className={classes.icon} />
      </Button>
    </form>
  )
}

SendMessage.propTypes = {
  onSendMessage: PropTypes.func,
}
