import cx from 'classnames'
import { Drawer } from 'lau-ui'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedChat } from '../../store/chats/slice'
import classes from './styles.module.css'
import { getFriendsSelector, getUserIdSelector, getUsernameSelector } from '../../store/user/selectors'
import { getSelectedChatSelector } from '../../store/chats/selectors'

export const Chats = () => {
  const dispatch = useDispatch()
  const userId = useSelector(getUserIdSelector)
  const username = useSelector(getUsernameSelector)
  const selected = useSelector(getSelectedChatSelector)
  const friends = useSelector(getFriendsSelector)

  const selectedUserHandler = (user) => () => dispatch(setSelectedChat(user))

  return (
    <Drawer className={classes.root}>
      {[{ userId, username, self: true }].concat(friends).map((user, index) => (
        <span
          onClick={selectedUserHandler(user)}
          key={index}
          className={cx(
            classes.user,
            user?.self && classes.self,
            user?.online && classes.online,
            selected?.username === user?.username && classes.selectedUser
          )}
        >
          {user.self ? 'Saved messages' : user.username}
        </span>
      ))}
    </Drawer>
  )
}
