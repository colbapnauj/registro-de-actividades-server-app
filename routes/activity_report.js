import express from 'express'
import dotenv from 'dotenv'
import { getTotalHoras, getHorasPorTipo, getTable, getTableWithTotal } from '../controllers/activity_report.js'
dotenv.config()

const router = express.Router()

router.get('/getTotalHoras', getTotalHoras)

// router.get('/getTotalHoras/:id', getTotalHoras)

router.get('/getHorasPorTipo', getHorasPorTipo)

router.get('/table', getTable)
router.get('/table/:year/:month', getTableWithTotal )

export default router
