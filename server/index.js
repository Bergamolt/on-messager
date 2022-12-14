import express from 'express'
import http from 'http'
import cookieparser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import { Server } from 'socket.io'

import auth from './routes/auth.js'
import messages from './routes/messages.js'
import userRouter from './routes/user.js'

import { addMessage } from './helpers/messages.js'
import {
  PRIVATE_MESSAGE,
  USERS,
  USER_CONNECTED,
  USER_DISCONNECTED,
  USER_OFFLINE,
  USER_ONLINE,
} from './services/constants.js'
import { connectDB } from './services/db.js'
import { authenticateJWT } from './middlewares/authenticateJwt.js'

import User from './models/user.js'

dotenv.config()

const app = express()
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: '*' } })

app.use(express.json())
app.use(cookieparser())
app.use(cors())

io.on('connection', (socket) => {
  const users = []

  for (let [id, socket] of io.of('/').sockets) {
    users.push({
      id: id,
      username: socket.username,
      messages: [],
    })
  }

  socket.emit(USERS, users)

  // Create channel and listener private message
  socket.join(socket.username)

  socket.on(PRIVATE_MESSAGE, async ({ content, to }) => {
    await addMessage(content, socket.username, to)

    socket.to(to).emit(PRIVATE_MESSAGE, {
      content,
      to,
      from: socket.username,
    })
  })

  socket.on(USER_CONNECTED, async ({ username }) => {
    const user = await User.findOne({ username })

    if (user) {
      user.online = true

      await User.where('friends.userId')
        .equals(user._id)
        .updateMany({
          $set: {
            'friends.$.online': true,
          },
        })

      await user.save()

      user.friends.forEach((it) => {
        io.to(it.username).emit(USER_ONLINE, user)
      })
    }
  })

  socket.on(USER_OFFLINE, async ({ username }) => {
    const user = await User.findOne({ username })

    if (user) {
      user.online = false

      await User.where('friends.userId')
        .equals(user._id)
        .updateMany({
          $set: {
            'friends.$.online': false,
          },
        })

      await user.save()

      user.friends.forEach((it) => {
        io.to(it.username).emit(USER_OFFLINE, user)
      })
    }
  })

  socket.on('disconnect', () => {
    socket.broadcast.emit(USER_DISCONNECTED, socket.username)
  })
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
app.use('/api/messages', authenticateJWT, messages)
app.use('/api/user', authenticateJWT, userRouter)

server.listen(process.env.PORT, () => console.log('Started server'))

connectDB(process.env.DB_URL)
