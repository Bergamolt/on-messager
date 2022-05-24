import express from 'express'
import http from 'http'
import cors from 'cors'
import {Server} from 'socket.io'
import mongodb from 'mongoose'
import auth from './routes/auth.js'

import dotenv from 'dotenv'
dotenv.config()

const app = express()
const server = http.createServer(app)
const io = new Server(server, {cors: {origin: '*'}})

app.use(express.json())
app.use(cors())

const activeUsers = new Set()

io.on('connection', (socket) => {
  const users = []

  for (let [id, socket] of io.of('/').sockets) {
    users.push({
      userId: id,
      username: socket.username,
      messages: [],
    })
  }

  socket.emit('users', users)

  socket.broadcast.emit('user connected', {
    userID: socket.id,
    username: socket.username,
  })

  socket.on('private message', ({content, to}) => {
    socket.to(to).emit('private message', {
      content,
      from: socket.id,
    })
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

mongodb.connect(process.env.MONGO_DB)

server.listen(process.env.PORT, () => console.log('Started server'))
