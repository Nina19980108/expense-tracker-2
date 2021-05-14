const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const New = require('./modules/new')
const edit = require('./modules/edit')
const category = require('./modules/category')

router.use('/', home)
router.use('/new', New)
router.use('/edit', edit)
router.use('/category', category)

module.exports = router