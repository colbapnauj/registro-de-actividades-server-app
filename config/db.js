import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

// Conectar a la base de datos de MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Database Connected')
  } catch (err) {
    console.log(err.message)
    process.exit(1)
  }
}

export default connectDB
