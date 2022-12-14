import classes from './styles.module.css'
import { useEffect, useState } from 'react'

import socket from '../../services/socket'
import { PRIVATE_MESSAGE, USERS, USER_CONNECTED, USER_DISCONNECTED, USER_OFFLINE, USER_ONLINE } from '../../services/socket/constants'

import { Messages } from '../../containers/messages'
import { SendMessage } from '../../containers/send-message'
import { Header } from '../../components/header'
import { Paper } from 'lau-ui'
import { Chats } from '../../containers/chats'
import { useDispatch, useSelector } from 'react-redux'
import { getUserIdSelector, getUsernameSelector } from '../../store/user/selectors'
import { setUserOnline, setUserOffline } from '../../store/user/actions'
import { getMessagesSelector, getSelectedChatSelector } from '../../store/chats/selectors'
import { setMessages } from '../../store/chats/slice'
import Axios from '../../services/axios'

export const Home = () => {
  const [users, setUsers] = useState([])
  console.log('users', users)
  const dispatch = useDispatch()
  const selectedUser = useSelector(getSelectedChatSelector)
  const messages = useSelector(getMessagesSelector)

  const username = useSelector(getUsernameSelector)
  const userId = useSelector(getUserIdSelector)

  const sendMessage = (content) => {
    if (selectedUser) {
      socket.emit(PRIVATE_MESSAGE, {
        content,
        to: selectedUser,
      })

      dispatch(
        setMessages([
          ...messages,
          {
            content,
            to: selectedUser,
            from: username,
          },
        ])
      )
    }
  }

  const allUsersHandler = (users) =>
    setUsers(() => users.map((user) => ({ ...user, self: user.username === username })))

  const offlineUser = (offlineUser) => setUsers((oldState) => oldState.filter((user) => user.username !== offlineUser))

  const addMessage = ({ content, from, to }) => {
    dispatch(
      setMessages([
        ...messages,
        {
          content,
          to,
          from,
        },
      ])
    )
  }

  useEffect(() => {
    if (userId) {
      socket.auth = { username }
      socket.connect()

      socket.emit(USER_CONNECTED, { username })
    }

    socket.on(PRIVATE_MESSAGE, ({ content, from, to }) => {
      console.log('PRIVATE_MESSAGE', { content, from, to })
      addMessage({ content, from, to })
    })

    socket.on(USERS, (users) => {
      allUsersHandler(users)
    })

    socket.on(USER_ONLINE, (user) => {
      dispatch(setUserOnline(user.username))
    })

    socket.on(USER_OFFLINE, (user) => { 
      dispatch(setUserOffline(user.username))
    })

    socket.on(USER_DISCONNECTED, (username) => {
      offlineUser(username)
    })

    return () => {
      socket.removeListener(PRIVATE_MESSAGE)
      socket.removeListener(USERS)
      socket.removeListener(USER_CONNECTED)
      socket.removeListener(USER_DISCONNECTED)
      socket.disconnect()
    }
  }, [userId, username])

  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      if (userId && selectedUser) {
        const { data } = await Axios.get('/api/messages/get', {
          headers: { 'Content-Type': 'application/json' },
          params: { from: username, to: selectedUser },
        })

        dispatch(setMessages(data))
      }
    })()
  }, [selectedUser, username])

  return (
    <>
      <Header />
      <div className={classes.root}>
        <>
          <Chats />

          <Paper className={classes.chat}>
            <Messages username={username} messages={messages} />
            <SendMessage onSendMessage={sendMessage} />
          </Paper>
        </>
      </div>
    </>
  )
}
