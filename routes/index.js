import express from 'express'
import Url from '../models/Url.js'
const router = express.Router()

router.get('/:urlId', async (req, res) => {
  try {
    const url = await Url.findOne({ urlId: req.params.urlId })
    if (url) {
      await Url.updateOne(
        {
          urlId: req.params.urlId
        },
        { $inc: { clicks: 1 } }
      )
      return res.redirect(url.origUrl)
    } else {
      res.status(404).json('No URL found')
    }
  } catch (err) {
    console.error(err)
    res.status(500).json('Server Error')
  }
})

router.get('/c/:urlId', async (req, res) => {
  try {
    const url = await Url.findOne({ urlId: req.params.urlId })
    console.log(url)
    if (url) {
      await Url.updateOne(
        {
          urlId: req.params.urlId
        },
        { $inc: { clicks: 1 } }
      )
      return res.redirect(url.origUrl)
    } else {
      res.status(404).json('No URL found')
    }
  } catch (err) {
    console.error(err)
    res.status(500).json('Server Error')
  }
})

export default router
