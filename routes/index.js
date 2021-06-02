const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const New = require('./modules/new')
const edit = require('./modules/edit')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth')

router.use('/new', authenticator, New)
router.use('/edit', authenticator, edit)
router.use('/users', users)
router.use('/', authenticator, home)

module.exports = router