const express = require('express')
const passport = require('passport')
const bcrypt = require('bcryptjs')

const router = express.Router()
const User = require('../../models/user')
router.get('/login', (req, res) => {
  res.render('login')
})
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))
router.get('/register', (req, res) => {
  res.render('register')
})
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push('Each space is required!')
  }
  if (password !== confirmPassword) {
    errors.push('Password and Confirm Password are differnet!')
  }
  if (errors.length) {
    return res.render('register', {
      name,
      email,
      password,
      confirmPassword,
      errors
    })
  }
  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.push('Email is exist!')
        return res.render('register', {
          name,
          email,
          password,
          confirmPassword,
          errors
        })
      }
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => {
          User.create({
            name,
            email,
            password: hash
          })
        })
        .then(() => res.redirect('/'))
        .catch(err => console.err(err))
    })
})
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'Logout successfully')
  res.redirect('/users/login')
})
module.exports = router