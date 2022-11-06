import mongoose from 'mongoose'

const { Schema, model } = mongoose

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
