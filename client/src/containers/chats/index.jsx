import PropTypes from 'prop-types'
import cx from 'classnames'
import { Drawer } from 'lau-ui'
import { useDispatch } from 'react-redux'
import { setSelectedChat } from '../../store/chats'
import classes from './styles.module.css'

export const Chats = ({ users, selected }) => {
  const dispatch = useDispatch()

  const selectedUserHandler = (user) => () => dispatch(setSelectedChat(user))

  return (
    <Drawer className={classes.root}>
      {users?.map((user, index) => (
        <span
          onClick={selectedUserHandler(user)}
          key={index}
          className={cx(
            classes.user,
            user?.self && classes.self,
            !user?.online && classes.online,
            selected?.username === user?.username && classes.selectedUser
          )}
        >
          {user.self ? 'Saved messages' : user.username}
        </span>
      ))}
    </Drawer>
  )
}

Chats.propTypes = {
  users: PropTypes.array,
  selected: PropTypes.object,
}
