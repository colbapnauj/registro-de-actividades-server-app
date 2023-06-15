import Url from '../models/Url.js'
import { validateUrl } from '../utils/utils.js'

const createCustomUrl = async (req, res) => {
  const { origUrl, customId } = req.body

  if (!validateUrl(origUrl)) {
    res.status(400).json('Invalid Original URL')
    return
  }

  try {
    let url = await Url.findOne({ origUrl })
    const urlId = await Url.findOne({ urlId: customId })

    if (url) {
      res.status(400)
      res.json({
        message: 'URL already exists',
        url
      })
    } else if (urlId) {
      res.status(400)
      res.json({
        message: 'Custom URL already exists',
        url: urlId
      })
    } else {
      url = new Url({
        origUrl,
        urlId: customId,
        date: new Date()
      })

      await url.save()
      res.json(url)
    }
  } catch (err) {
    console.error(err)
    res.status(500).json('Server Error')
  }
}
