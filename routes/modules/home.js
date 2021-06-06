const express = require('express')
const record = require('../../models/record')
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
    .sort({ date: 'desc' })
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

router.get('/selected/:id', (req, res) => {
  const { category } = req.query
  const month = req.query.month || ''

  let fa_home = false
  let fa_shuttle_van = false
  let fa_grin_beam = false
  let fa_utensils = false
  let fa_pen = false

  if (category === 'Category') {
    return res.redirect('/')
  }

  switch (category) {
    case 'fa-home':
      fa_home = true
      break
    case 'fa-shuttle-van':
      fa_shuttle_van = true
      break
    case 'fa-grin-beam':
      fa_grin_beam = true
      break
    case 'fa-utensils':
      fa_utensils = true
      break
    case 'fa-pen':
      fa_pen = true
      break
  }

  let JAN = false
  let FEB = false
  let MAR = false
  let APR = false
  let MAY = false
  let JUN = false
  let JUL = false
  let AUG = false
  let SEP = false
  let OCT = false
  let NOV = false
  let DEC = false

  switch (month) {
    case '01':
      JAN = true
      break
    case '02':
      FEB = true
      break
    case '03':
      MAR = true
      break
    case '04':
      APR = true
      break
    case '05':
      MAY = true
      break
    case '06':
      JUN = true
      break
    case '07':
      JUL = true
      break
    case '08':
      AUG = true
      break
    case '09':
      SEP = true
      break
    case '10':
      OCT = true
      break
    case '11':
      NOV = true
      break
    case '12':
      DEC = true
      break
  }

  const query = new RegExp(category)
  let totalAmount = 0
  const userId = req.params.id

  Record.find({ $or: [{ category: query }] })
    .find({ userId })
    .lean()
    .then(record => {
      if (month === 'Month') {
        return record
      }
      record = record.filter(rec => {
        const [dateYear, dateMon] = rec.date.split('-')
        if (month === dateMon) {
          return rec
        }
      })
      return record
    })
    .then(record => {
      record.forEach(record => {
        totalAmount += record.amount
      })
    })
    .catch(error => console.error(error))

  return Record.find({ $or: [{ category: query }] })
    .find({ userId })
    .sort({ date: 'desc' })
    .lean()
    .then(record => {
      if (month === 'Month') {
        return record
      }
      record = record.filter(rec => {
        const [dateYear, dateMon] = rec.date.split('-')
        if (month === dateMon) {
          return rec
        }
      })
      return record
    })
    .then(record => res.render('index', { record, userId, totalAmount, fa_home, fa_shuttle_van, fa_grin_beam, fa_utensils, fa_pen, JAN, MAR, APR, MAY, JUN, JUL, AUG, SEP, OCT, NOV, DEC }))
    .catch(error => console.error(error))
})

module.exports = router