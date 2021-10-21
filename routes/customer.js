const express = require("express")
const router = express.Router()
const { middleware } = require("../helper/helper")
const customerController = require("../controllers/customerController")

router.get('/:id/profile', customerController.showProfile)
router.get('/:id/profile/add', customerController.addProfile)
router.post('/:id/profile/add', customerController.postAddProfile)
router.get('/:id/profile/edit', customerController.editProfile)
router.post('/:id/profile/edit', customerController.postEditProfile)

module.exports = router