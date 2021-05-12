const mongoose = require('mongoose')
const Record = require('../record')

mongoose.connect('mongodb://localhost/record', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 1; i <= 10; i++) {
    Record.create({
      name: 'name' + i,
      category: 'fa-home',
      date: '2020-05-10',
      amount: 30
    })
  }
  console.log('Done!')
})