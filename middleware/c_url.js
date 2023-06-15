// function to validate that body contains a fields origUrl and customId
const validateUrl = (req, res, next) => {
  const { origUrl, customId } = req.body
  if (origUrl && customId) {
    next()
  } else {
    res.status(400).json('origUrl and customId are required')
  }
}

export { validateUrl }
