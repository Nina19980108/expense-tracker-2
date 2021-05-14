const express = require('express')
const router = express.Router()

const Record = require('../../models/record')

router.get('/', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const newRecord = req.body
  return Record.create(newRecord)
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

module.exports = router