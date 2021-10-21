const express = require("express")
const router = express.Router()
const routerHome = require("./home")
const { middleware } = require("../helper/helper")
const userController = require("../controllers/userController")

router.get('/:id/profile', userController.showProfile)
router.get('/:id/profile/add', userController.addProfile)
router.post('/:id/profile/add', userController.postAddProfile)
router.get('/:id/profile/edit', userController.editProfile)
router.post('/:id/profile/edit', userController.postEditProfile)

module.exports = router
