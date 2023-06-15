import Url from '../models/Url.js'
import { validateUrl } from '../utils/utils.js'

const getUrls = async (req, res) => {
  try {
    const urls = await Url.find({ shorterBy: 'customid' })
    if (urls) {
      res.send(urls)
    } else {
      res.status(404).json('No URL found')
    }
    console.log(req.headers.host)
  } catch (err) {
    console.error(err)
    res.status(500).json('Server Error')
  }
}

const getUrl = async (req, res) => {
  try {
    const { id } = req.params
    const response = await Url.findOne({ _id: id })
    if (response) {
      res.send(response)
    } else {
      res.status(404).json('No URL found')
    }
  } catch (err) {
    console.error(err)
    res.status(500).json('Server Error')
  }
}

const createUrl = async (req, res) => {
  const { origUrl, description, customId } = req.body

  if (validateUrl(origUrl)) {
    try {
      let url = await Url.findOne({ origUrl })
      if (url) {
        res.status(200)
        res.json(url)
      } else {
        url = new Url({
          origUrl,
          urlId: customId,
          description,
          date: new Date(),
          shorterBy: 'customid'
        })

        await url.save()
        res.status(201)
        res.json(url)
      }
    } catch (err) {
      console.error(err)
      res.status(500).json('Server Error')
    }
  } else {
    res.status(400).json('Invalid Original URL')
  }
}

const updateUrl = async (req, res) => {
  const { origUrl, customId, description } = req.body
  const { id } = req.params

  if (validateUrl(origUrl)) {
    try {
      const url = await Url.findOne({ _id: id })
      if (url) {
        url.origUrl = origUrl
        url.urlId = customId
        url.description = description
        url.date = new Date()
        await url.save()
        res.json(url)
      } else {
        res.status(400)
        res.json({
          message: 'No URL found'
        })
      }
    } catch (err) {
      console.error(err)
      res.status(500).json('Server Error')
    }
  } else {
    res.status(400).json('Invalid Original URL')
  }
}

const deleteUrl = async (req, res) => {
  try {
    const { id } = req.params
    const response = await Url.deleteOne({ _id: id })
    res.send(response)
  } catch (err) {
    console.error(err)
    res.status(500).json('Server Error')
  }
}

export { getUrl, getUrls, createUrl, updateUrl, deleteUrl }
