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
  friends: [{ userId: { type: Types.ObjectId, ref: 'User' }, username: { type: String } }],
})

export default model('User', schema)
