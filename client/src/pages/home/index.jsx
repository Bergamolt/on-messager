import '../../App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

import socket from '../../services/socket'
import { PRIVATE_MESSAGE, USERS, USER_CONNECTED, USER_DISCONNECTED } from '../../services/socket/constants'

import { Messages } from '../../containers/messages'
import { SendMessage } from '../../containers/send-message'
import { Header } from '../../components/header'
import { Paper } from 'lau-ui'
import { Chats } from '../../containers/chats'
import { useSelector } from 'react-redux'
import { getUserIdSelector, getUsernameSelector } from '../../store/auth/selectors'
import { getSelectedChatSelector } from '../../store/chats/selectors'

export const Home = () => {
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])
  const selectedUser = useSelector(getSelectedChatSelector)

  const username = useSelector(getUsernameSelector)
  const userId = useSelector(getUserIdSelector)

  const sendMessage = (content) => {
    console.log('sendMessage___')
    if (selectedUser) {
      socket.emit(PRIVATE_MESSAGE, {
        content,
        to: selectedUser.username,
      })

      setMessages([
        ...messages,
        {
          content,
          to: selectedUser.username,
          from: username,
        },
      ])
    }
  }

  const allUsersHandler = (users) =>
    setUsers(() => users.map((user) => ({ ...user, self: user.username === username })))

  const offlineUser = (offlineUser) => setUsers((oldState) => oldState.filter((user) => user.username !== offlineUser))

  const onlineUser = (onlineUser) => setUsers((oldState) => [...oldState, onlineUser])

  const addMessage = ({ content, from, to }) => {
    if (selectedUser.username === from) {
      setMessages((oldState) => [...oldState, { content, from, to }])
    }
  }

  useEffect(() => {
    if (userId) {
      socket.auth = { username }
      socket.connect()
    }

    socket.on(PRIVATE_MESSAGE, ({ content, from, to }) => {
      addMessage({ content, from, to })
    })

    socket.on(USERS, (users) => {
      allUsersHandler(users)
    })

    socket.on(USER_CONNECTED, (user) => {
      onlineUser(user)
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
    (async () => {
      if (selectedUser) {
        const { data } = await axios.get('/api/messages/get', {
          headers: { 'Content-Type': 'application/json' },
          params: { from: username, to: selectedUser.username },
        })

        setMessages(data)
      }
    })()
  }, [selectedUser, username])

  return (
    <>
      <Header />
      <div className='content'>
        <>
          <Chats users={users} selected={selectedUser} />

          <Paper className='chat'>
            <Messages username={username} messages={messages} />
            <SendMessage onSendMessage={sendMessage} />
          </Paper>
        </>
      </div>
    </>
  )
}
