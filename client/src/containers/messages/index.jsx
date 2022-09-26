import PropTypes from 'prop-types'
import cx from 'classnames'
import classes from './styles.module.css'

export const Messages = ({ messages, username }) => {
  return (
    <ul className={classes.root} id='messages'>
      {messages?.map((msg, i) => (
        <li className={cx(username === msg.from && classes.self)} key={i}>
          {msg.content}
        </li>
      ))}
    </ul>
  )
}

Messages.propTypes = {
  messages: PropTypes.array,
  username: PropTypes.string,
}
