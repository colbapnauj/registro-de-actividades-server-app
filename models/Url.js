import mongoose from 'mongoose'

const UrlSchema = new mongoose.Schema({
  urlId: {
    type: String,
    required: true,
    unique: true
  },
  origUrl: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false,
    default: ''
  },
  clicks: {
    type: Number,
    required: true,
    default: 0
  },
  date: {
    type: String,
    default: Date.now
  },
  shorterBy: {
    type: String,
    required: true,
    default: 'nanoid'
  }
})

export default mongoose.model('Url', UrlSchema)
