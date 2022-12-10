import mongoose from 'mongoose'

export const connectDB = async (DB_URL) => {
  mongoose
    .connect(DB_URL)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error(err))
}
