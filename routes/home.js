const express = require("express")
const router = express.Router()
const { middleware, isAdmin } = require("../helper/helper")

router.get('/', middleware,(req, res) => {
    res.send('only admin gaiss')
})

router.get('/masuk', isAdmin, (req, res) => {
    res.send('masuk boleh bukan admin soalnye')
})


module.exports = router