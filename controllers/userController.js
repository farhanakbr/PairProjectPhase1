const { User } = require("../models")
const { Op } = require("sequelize");
const { isValidAccount } = require("../helper/helper")

class userController {
    static registerForm(req, res) {
        let error;
        if (req.query.error) {
            error = req.query.error.split(',')
        }
        res.render('registerForm', {error})
    }

    static postRegisterForm(req, res) {
        let {username, email, password, dateOfBirth, role} = req.body
        User.create({username, email, password, dateOfBirth, role})
        .then(newUser => {
            res.redirect('/user/login')
        })
        .catch(err => {
            let errors = err.errors.map(el => {
                return el.message
            })
            res.redirect(`/user/register?error=${errors}`)
        })
    }

    static loginForm(req, res) {
        let error = req.query.error
        res.render('login', {error})
    }

    static postLogin(req, res) {
        let {usernameOremail, password} = req.body
        User.findAll({
            where:{
                [Op.or]: [{
                    username: usernameOremail
                }, {
                    email: usernameOremail
                }]
            }
        })
        .then(data => {
            if (isValidAccount(data[0].password,password)) {
                req.session.role = data[0].role
                return res.redirect('/home')
            } else{
                return res.redirect('/user/login?error=Email and Password is wrong')
            }
        })
        .catch(err => {
            res.redirect('/user/login?error=Email and Password is wrong')
        })
    }

    static logOut(req, res) {
        req.session.destroy(err => {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/user/login')
            }
        })
    }
}

module.exports = userController