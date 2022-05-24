import './App.css'
import {useContext, useEffect, useState} from 'react'
import socket from './socket'

import {Messages} from './containers/Messages'
import {SendMessageForm} from './containers/SendMessageForm'
import {Header} from './components/header'
import {Chats} from './containers/chats'
import { AuthContext } from './context/auth'

export const Re = () => {
  const [messages, setMessages] = useState([])
  const [username, setUsername] = useState(null)
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)

  const {userId} = useContext(AuthContext)

  // {
  //   messages: [
  //     {
  //       content: '',
  //       fromSelf: true or false
  //     }
  //   ],
  //   userId: '',
  //   username: ''
  // }

  const sendMessage = (content) => {
    if (selectedUser) {
      socket.emit('private message', {
        content,
        to: selectedUser.userId,
      })

      selectedUser.messages.push({
        content,
        fromSelf: true,
      })
    }
  }

  useEffect(() => {
    socket.on('connect_error', (err) => {
      if (err.message === 'invalid username') {
        console.log(err)
      }
    })

    // socket.on('users', (users) => {
    //   setUsers(
    //     users.map((user) => ({...user, self: user.username === username}))
    //   )
    // })

    socket.on('user connected', (user) => {
      setUsers((oldUsers) =>
        oldUsers
          .filter((it) => it.username !== user.username)
          .concat([user])
          .map((user) => ({...user, self: user.username === username}))
      )
    })

    socket.on('private message', ({content, from}) => {
      setUsers((oldUsers) => {
        return oldUsers.map((user) => {
          if (user.userId === from) {
            return {
              ...user,
              messages: [...user.messages, {content, fromSelf: true}],
            }
          }
        })
      })
    })

    return () => {
      socket.off('connect_error')
    }
  }, [])

  useEffect(() => {
    if (userId) {
      socket.connect()
    }

    return () => socket.disconnect()
  }, [userId])
  console.log({users})
  return (
    <>
      <Header />
      <div className="content">
        <>
          <Chats
            users={users}
            selected={selectedUser}
            handlerSelectedUser={setSelectedUser}
          />
          <div className="chat">
            <Messages messages={messages} />
            <SendMessageForm onSendMessage={sendMessage} />
          </div>
        </>
      </div>
    </>
  )
}
