const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const New = require('./modules/new')
const edit = require('./modules/edit')

router.use('/', home)
router.use('/new', New)
router.use('/edit', edit)

module.exports = router