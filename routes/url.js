import express from 'express'
import dotenv from 'dotenv'
import { getUrls, getUrl, createUrl, updateUrl, deleteUrl } from '../controllers/url.js'
dotenv.config()

const router = express.Router()

router.get('/', getUrls)

router.get('/:id', getUrl)

router.patch('/:id', updateUrl)

// Shorter URL Generator
router.post('/', createUrl)

router.delete('/:id', deleteUrl)

export default router
