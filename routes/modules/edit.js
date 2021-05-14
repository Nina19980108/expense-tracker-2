const express = require('express')
const router = express.Router()

const Record = require('../../models/record')

router.get('/:id', (req, res) => {
  const id = req.params.id
  let fa_home = false
  let fa_shuttle_van = false
  let fa_grin_beam = false
  let fa_utensils = false
  let fa_pen = false
  Record.findById(id)
    .lean()
    .then(record => {
      if (record.category === 'fa-home') {
        fa_home = true
      } else if (record.category === 'fa-shuttle-van') {
        fa_shuttle_van = true
      } else if (record.category === 'fa-grin-beam') {
        fa_grin_beam = true
      } else if (record.category === 'fa-utensils') {
        fa_utensils = true
      } else if (record.category === 'fa-pen') {
        fa_pen = true
      }
    })
    .catch(error => console.error(error))

  return Record.findById(id)
    .lean()
    .then(record => res.render('edit', { record, fa_home, fa_shuttle_van, fa_grin_beam, fa_utensils, fa_pen }))
    .catch(error => console.error(error))
})

module.exports = router