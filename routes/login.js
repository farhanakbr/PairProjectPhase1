const express = require("express")
const router = express.Router()
const routerHome = require("./home")
const { middleware } = require("../helper/helper")
const userController = require("../controllers/userController")

router.get('/register', userController.registerForm)
router.post('/register', userController.postRegisterForm)

router.get('/login', userController.loginForm)
router.post('/login', userController.postLogin)
 


router.get('/logout', userController.logOut)

module.exports = router