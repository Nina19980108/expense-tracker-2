const bcrypt = require('bcryptjs')
require('dotenv')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv')
}
const db = require('../../config/mongoose')
const Record = require('../record')
const User = require('../user')

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

const SEED_USER = {
  name: 'root',
  email: 'root@email.com',
  password: 'root'
}

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => {
      return User.create({
        name: SEED_USER.name,
        email: SEED_USER.email,
        password: hash
      })
    })
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from(
        { length: expenses.length },
        (_, i) => {
          return Record.create({
            name: expenses[i].name,
            category: expenses[i].category,
            date: expenses[i].date,
            amount: expenses[i].amount,
            merchant: expenses[i].merchant || null,
            userId
          })
        }
      ))
    })
    .then(() => {
      console.log('done.')
      process.exit()
    })
})