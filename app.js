const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const record = require('./models/record')
const Record = require('./models/record')

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
    .then(record => res.render('index', { record, totalAmount }))
    .catch(error => console.error(error))
})

app.listen(port, () => {
  console.log(`app is listening on http://localhost:${port}`)
})