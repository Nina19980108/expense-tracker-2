const db = require('../../config/mongoose')
const Record = require('../record')

const expenses = [
  ['tissue', 'fa-home', '2021-04-22', 254, 'costco'],
  ['monthly pass', 'fa-shuttle-van', '2021-05-01', 1200, 'bus station'],
  ['movie ticket', 'fa-grin-beam', '2021-05-11', 350, 'in89'],
  ['coffee', 'fa-utensils', '2021-05-12', 65, 'starbuck'],
  ['tuition', 'fa-pen', '2021-05-20', 2000]
].map(expense => ({
  name: expense[0],
  category: expense[1],
  date: expense[2],
  amount: expense[3],
  merchant: expense[4]
}))

db.once('open', () => {
  Record.create(expenses)
    .then(() => {
      console.log('insert expenses done!')
      return db.close()
    })
    .then(() => {
      console.log('record datebase close!')
    })
})