const db = require('../../config/mongoose')
const Record = require('../record')

db.once('open', () => {
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