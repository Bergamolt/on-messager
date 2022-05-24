import cx from 'classnames'
import classes from './styles.module.css'

export const Chats = ({users, selected, handlerSelectedUser}) => (
  <nav className={classes.root}>
    {users &&
      users.map(
        (user, index) =>
          !user.self && (
            <span
              onClick={() => handlerSelectedUser(user)}
              key={index}
              className={cx(
                classes.user,
                selected?.username === user?.username && classes.selectedUser
              )}
            >
              {user.username}
            </span>
          )
      )}
  </nav>
)
