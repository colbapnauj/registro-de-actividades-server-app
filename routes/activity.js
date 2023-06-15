import express from 'express'
import dotenv from 'dotenv'
import { index, show, create, update, deleteActivity } from '../controllers/activity.js'
dotenv.config()

const router = express.Router()

router.get('/', index)

router.get('/:id', show)

router.patch('/:id', update)

router.post('/', create)

router.delete('/:id', deleteActivity)

export default router
