const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Record = require('./models/record')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const port = 3000
const app = express()

mongoose.connect('mongodb://localhost/record', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
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

app.get('/new', (req, res) => {
  res.render('new')
})

app.post('/new', (req, res) => {
  const newRecord = req.body
  return Record.create(newRecord)
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

app.get('/edit/:id', (req, res) => {
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

app.put('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => {
      record = Object.assign(record, req.body)
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

app.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

app.get('/category', (req, res) => {
  const category = req.query.category

  let fa_home = false
  let fa_shuttle_van = false
  let fa_grin_beam = false
  let fa_utensils = false
  let fa_pen = false

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
  Record.find({ $or: [{ category: query }] })
    .lean()
    .then(record => {
      record.forEach(record => {
        totalAmount += record.amount
      })
    })
    .catch(error => console.error(error))

  return Record.find({ $or: [{ category: query }] })
    .lean()
    .then(record => res.render('index', { record, totalAmount, fa_home, fa_shuttle_van, fa_grin_beam, fa_utensils, fa_pen }))
    .catch(error => console.error(error))
})

app.listen(port, () => {
  console.log(`App is on http://localhost:${port}`)
})