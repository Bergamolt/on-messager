import PropTypes from 'prop-types'
import cx from 'classnames'
import classes from './styles.module.css'

export const Messages = ({ messages, username }) => {
  const date = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric' })

  return (
    <div className={classes.root} id='messages'>
      {messages?.map((msg, i) => (
        <div className={cx(classes.bubble, username === msg.from && classes.self)} key={i}>
          <div className={classes.bubble_content}>
            <div className={classes.message}>
              <span>{msg.content}</span>
              <span className={classes.time}>{date.format(msg.date)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

Messages.propTypes = {
  messages: PropTypes.array,
  username: PropTypes.string,
}
