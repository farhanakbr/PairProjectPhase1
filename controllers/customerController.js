const { User, Profile } = require("../models")
const { Op } = require("sequelize");
const { isValidAccount } = require("../helper/helper")

class customerController {

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

module.exports = customerController