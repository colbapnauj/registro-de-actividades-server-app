import express from 'express'
import dotenv from 'dotenv'
import { createCustomUrl } from '../controllers/customurl.js'
dotenv.config()

const router = express.Router()

router.post('/custom', createCustomUrl)

export default router
