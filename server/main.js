import express from 'express'
import http from 'http'
import cors from 'cors'
import { Server } from 'socket.io'
import mongodb from 'mongoose'

import auth from './routes/auth.js'
import messages from './routes/messages.js'
import usersRouter from './routes/users.js'

import dotenv from 'dotenv'
import { addMessage } from './helpers/messages.js'
import { PRIVATE_MESSAGE, USERS } from './services/constants.js'
dotenv.config()

const app = express()
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: '*' } })

app.use(express.json())
app.use(cors())

io.on('connection', (socket) => {
  const users = []

  for (let [id, socket] of io.of('/').sockets) {
    // if (!messages[socket.username]) {
    //   messages[socket.username] = []
    // }

    users.push({
      id: id,
      username: socket.username,
      messages: [],
    })
  }

  socket.emit(USERS, users)

  // socket.broadcast.emit('user connected', {
  //   id: socket.id,
  //   username: socket.username,
  //   messages: [],
  // })

  // Create channel and listener private message

  socket.join(socket.username)

  socket.on(PRIVATE_MESSAGE, async ({ content, to }) => {
    // messages[socket.username] = [
    //   ...messages[socket.username],
    //   {
    //     content,
    //     to,
    //     from: socket.username,
    //   },
    // ]

    // messages[to] = [
    //   ...messages[to],
    //   {
    //     content,
    //     to,
    //     from: socket.username,
    //   },
    // ]

    await addMessage(content, socket.username, to)

    socket.to(to).emit(PRIVATE_MESSAGE, {
      content,
      to,
      from: socket.username,
    })
  })

  socket.on('connect', () =>
    socket.broadcast.emit('user connected', {
      id: socket.id,
      username: socket.username,
      messages: [],
    })
  )

  socket.on('disconnect', () => socket.broadcast.emit('user disconnected', { username: socket.username }))

  socket.on('user logout', () => socket.broadcast.emit('user logout', { username: socket.username }))
})

io.use((socket, next) => {
  const username = socket.handshake.auth.username

  if (!username) {
    return next(new Error('invalid username'))
  }

  socket.username = username

  next()
})

app.use('/api/auth', auth)
app.use('/api/messages', messages)
app.use('/api/users', usersRouter)

mongodb.connect(process.env.MONGO_DB)

server.listen(process.env.PORT, () => console.log('Started server'))
