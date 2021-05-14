const express = require('express')
const router = express.Router()

const Record = require('../../models/record')

router.get('/', (req, res) => {
  let totalAmount = 0
  Record.find()
    .lean()
    .then(record => {
      record.forEach(record => {
        totalAmount += record.amount
      })
    })
    .catch(error => console.error(error))

  Record.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(record => res.render('index', { record, totalAmount }))
    .catch(error => console.error(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => {
      record = Object.assign(record, req.body)
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

module.exports = router