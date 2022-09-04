import mongoose from 'mongoose'

const { Schema, Types, model } = mongoose

const schema = new Schema({
  from: {
    type: String,
  },
  to: {
    type: String,
  },
  content: {
    type: String,
  },
  date: {
    type: Number,
  },
})

export default model('Messages', schema)
