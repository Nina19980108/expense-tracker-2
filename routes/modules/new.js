const express = require('express')
const router = express.Router()

const Record = require('../../models/record')

router.get('/', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const { name, category, date, amount, merchant } = req.body
  const userId = req.user._id
  return Record.create({ name, category, date, amount, merchant, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

module.exports = router