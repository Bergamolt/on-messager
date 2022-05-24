import {useFormik} from 'formik'

export const SendMessageForm = ({onSendMessage}) => {
  const formik = useFormik({
    initialValues: {
      input: '',
    },
    onSubmit: ({input}) => onSendMessage(input),
  })

  return (
    <form id="form" action="" onSubmit={formik.handleSubmit}>
      <input
        id="input"
        autoComplete="off"
        value={formik.values.input}
        onChange={formik.handleChange}
      />
      <button type="submit">Send</button>
    </form>
  )
}
