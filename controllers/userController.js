const { User, Profile } = require("../models")
const { Op } = require("sequelize");
const { isValidAccount } = require("../helper/helper")

class userController {
  static registerForm(req, res) {
    let error;
    if (req.query.error) {
      error = req.query.error.split(',')
    }
    res.render('registerForm', { error })
  }

  static postRegisterForm(req, res) {
    let { username, email, password, dateOfBirth, role } = req.body
    User.create({ username, email, password, dateOfBirth, role })
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
    res.render('login', { error })
  }

  static postLogin(req, res) {
    let { usernameOremail, password } = req.body
    User.findAll({
      where: {
        [Op.or]: [{
          username: usernameOremail
        }, {
          email: usernameOremail
        }]
      }
    })
      .then(data => {
        if (isValidAccount(data[0].password, password)) {
          req.session.role = data[0].role
          return res.send('thats right')
        } else {
          return res.redirect('/login?error=Email and Password is wrong')
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

  static showProfile(req, res) {
    Profile.findByPk(req.params.id)
      .then(data => {
        // res.send(data)
        res.render('profile', { data })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static addProfile(req, res) {
    let UserId = req.params.id
    console.log(req.query.error)
    let err;
    if (req.query.err) {
      err = req.query.err.split(',')
    }
    Profile.findByPk(UserId)
      .then(data => {
        res.render('addProfile', { data, err })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static postAddProfile(req, res) {
    let { firstName, lastName, dateOfBirth, favoriteGenre } = req.body;
    Profile.create({
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      favoriteGenre: favoriteGenre,
      UserId: req.params.id,
    })
      .then(() => {
        res.redirect(`/customer/${req.params.id}/profile`)
      })
      .catch(err => {
        let errors = err.errors.map(el => {
          return el.message
        })
        res.redirect(`/customer/${req.params.id}/profile/?error=${errors}`)
      })
  }

  static editProfile(req, res) {
    let UserId = req.params.id
    // console.log(req.query.error)
    let error;
    if (req.query.error) {
      error = req.query.error.split(',')
    }
    Profile.findByPk(UserId, {
      include: {
        model: User,
      }
    })
      .then(data => {
        res.render('profileForm', { data, error })
      })
      .catch(err => {
        res.send(error)
      })
  }

  static postEditProfile(req, res) {
    let UserId = req.params.id
    let { firstName, lastName, dateOfBirth, favoriteGenre } = req.body
    console.log(req.body)
    Profile.update({
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      favoriteGenre: favoriteGenre,
      UserId: UserId
    },
      { where: { id: UserId } }
    )
      .then(() => {
        // res.send(data)
        res.redirect(`/customer/${UserId}/profile`)
      })
      .catch(err => {
        let errors = err.errors.map(el => {
          return el.message
        })
        res.redirect(`/customer/${UserId}/profile/edit/?error=${errors}`)
      })
  }
}

module.exports = userController