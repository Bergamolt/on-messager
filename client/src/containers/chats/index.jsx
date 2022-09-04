import cx from 'classnames'
import { Drawer } from 'lau-components'
import { useDispatch } from 'react-redux'
import { setSelectedChat } from '../../store/chats'
import classes from './styles.module.css'

export const Chats = ({ users, selected }) => {
  const dispatch = useDispatch()

  return (
    <Drawer className={classes.root}>
      {users &&
        users.map((user, index) => (
          <span
            onClick={() => dispatch(setSelectedChat(user))}
            key={index}
            className={cx(
              classes.user,
              selected?.username === user?.username && classes.selectedUser,
              !user?.online && classes.online
            )}
          >
            {user.username}
          </span>
        ))}
    </Drawer>
  )
}
