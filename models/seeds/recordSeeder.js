const mongoose = require('mongoose')
const Record = require('../record')

mongoose.connect('mongodb://localhost/record', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < 10; i++) {
    Record.create({
      name: 'name' + i,
      category: 'category' + i,
      date: '2020/05/13',
      amount: 30
    })
  }
  console.log('Done!')
})