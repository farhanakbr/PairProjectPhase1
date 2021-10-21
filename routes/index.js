const express = require('express')
const homeRouter = require('./home')
const loginRouter = require('./login')
const customerRouter = require("./customer")

const router = express.Router()

router.use('/home', homeRouter)
router.use('/user', loginRouter)
router.use('/customer', customerRouter)
module.exports = router

