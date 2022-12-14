import mongoose from 'mongoose'

const { Schema, model, Types } = mongoose

const schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  online: {
    type: Boolean,
    default: false,
  },
  friends: [
    {
      userId: { type: Types.ObjectId, ref: 'User' },
      username: { type: String, ref: 'User.username' },
      online: { type: Boolean, default: false },
    },
  ],
})

export default model('User', schema)
