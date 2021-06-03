const express = require('express')
const router = express.Router()

const Record = require('../../models/record')

router.get('/', (req, res) => {
  let totalAmount = 0
  const userId = req.user._id
  Record.find({ userId })
    .lean()
    .then(record => {
      record.forEach(record => {
        totalAmount += record.amount
      })
    })
    .catch(error => console.error(error))

  Record.find({ userId })
    .lean()
    .sort({ _id: 'asc' })
    .then(record => res.render('index', { record, totalAmount, userId }))
    .catch(error => console.error(error))
})

router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

router.get('/category/:id', (req, res) => {
  const category = req.query.category

  let fa_home = false
  let fa_shuttle_van = false
  let fa_grin_beam = false
  let fa_utensils = false
  let fa_pen = false

  if (category === 'Category') {
    return res.redirect('/')
  }

  if (category === 'fa-home') {
    fa_home = true
  } else if (category === 'fa-shuttle-van') {
    fa_shuttle_van = true
  } else if (category === 'fa-grin-beam') {
    fa_grin_beam = true
  } else if (category === 'fa-utensils') {
    fa_utensils = true
  } else if (category === 'fa-pen') {
    fa_pen = true
  }

  const query = new RegExp(category)
  let totalAmount = 0
  let allRecord = false
  const userId = req.params.id
  Record.find({ userId })
    .then(record => {
      if (record) allRecord = true
      return
    })
    .catch(err => console.err(err))

  Record.find({ $or: [{ category: query }] })
    .find({ userId })
    .lean()
    .then(record => {
      record.forEach(record => {
        totalAmount += record.amount
      })
    })
    .catch(error => console.error(error))

  return Record.find({ $or: [{ category: query }] })
    .find({ userId })
    .lean()
    .then(record => res.render('index', { record, allRecord, userId, totalAmount, fa_home, fa_shuttle_van, fa_grin_beam, fa_utensils, fa_pen }))
    .catch(error => console.error(error))
})

module.exports = router