import '../../App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

import socket from '../../services/socket'
import { PRIVATE_MESSAGE, USERS } from '../../services/socket/constants'

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
      socket.emit('private message', {
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

      // setUsers(
      //   users.map((user) => {
      //     if (user.self) {
      //       user.messages.push({
      //         content,
      //         fromSelf: true,
      //         to: selectedUser.username,
      //       })
      //     }

      //     return user
      //   })
      // )
    }
  }

  const allUsersHandler = (users) =>
    setUsers((oldState) => users.map((user) => ({ ...user, self: user.username === username })))

  const offlineUser = (offlineUser) => setUsers((oldState) => oldState.filter((user) => user.username !== offlineUser))

  const onlineUser = (onlineUser) => setUsers((oldState) => [...oldState, onlineUser])

  const addMessage = ({ content, from, to }) => {
    console.log(selectedUser?.username)
    if (selectedUser.username === from) {
      setMessages((oldState) => [...oldState, { content, from, to }])
    }
  }

  useEffect(() => {
    socket.on('users', (users) => allUsersHandler(users))

    socket.on('connect', () => console.log('connect____'))

    socket.on('disconnect', () => console.log('disconnect____'))

    // Messages
    socket.on(PRIVATE_MESSAGE, ({ content, from, to }) => {
      console.log('Private message____', { content, from, to })
      addMessage({ content, from, to })
    })

    if (userId) {
      socket.auth = { username }
      socket.connect()
    }

    return () => {
      socket.removeListener(PRIVATE_MESSAGE)
      socket.removeListener(USERS)
      socket.removeListener('connect')
      socket.removeListener('disconnect')
      socket.disconnect()
    }
  }, [userId, username])

  useEffect(() => {
    ;(async () => {
      if (selectedUser) {
        const { data } = await axios.get('/api/messages/get', {
          headers: { 'Content-Type': 'application/json' },
          params: { from: username, to: selectedUser.username },
        })

        setMessages(data)
      }
    })()
  }, [selectedUser, username])

  console.log('USERS___', { selectedUser })

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
