const { Category, GuestStars, Concert } = require("../models")

class Controller {
    static homePage(req, res) {
        Category.findAll({
            include: {
                model: GuestStars,
            },
        })
            .then(data => {
                // res.send(data)
                res.render('home', { data })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static addNewCategory(req, res) {
        res.render('addNewCategory')
    }

    static postNewCategory(req, res) {
        let { name, photo } = req.body
        Category.create({ name, photo })
            .then(data => {
                res.redirect('/home')
            })
            .catch(err => {
                let error = err.errors.map(el => {
                    return el.message
                })
                res.send(error)
            })
    }

    static showListConcert(req, res) {
        Concert.findAll()
            .then(data => {
                res.render('listConcert', { data })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static addGuestStar(req, res) {
        let category;
        Category.findAll()
            .then(categoryData => {
                category = categoryData
                return Concert.findAll()
            })
            .then(concert => {
                res.render('addNewGuestStar', { category, concert })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static postAddGuestStar(req, res) {
        let { CategoryId, name, debutYear, ConcertId, imageURL } = req.body
        GuestStars.create({ CategoryId, name, debutYear, ConcertId, imageURL })
            .then(data => {
                res.send('masukkkk')
            })
            .catch(err => {
                let error = err.errors.map(el => {
                    return el.message
                })
                res.send(error)
            })
    }

    static addNewConcert(req, res) {
        res.render('addNewConcert')
    }

    static postNewConcert(req, res) {
        let { name, location, date, price, imageURL } = req.body
        Concert.create({ name, location, date, price: +price, imageURL })
            .then(data => {
                res.redirect(`/home/list/concert`)
            })
            .catch(err => {
                console.log(err);
                let error = err.errors.map(el => {
                    return el.message
                })
                res.send(error)
            })
    }

    static seeDetailListCategory(req, res) {
        let categoryId = req.params.categoryId
        Category.findByPk(+categoryId, {
            include: {
                model: GuestStars,
                where: {
                    CategoryId: +categoryId
                }
            }
        })
            .then(data => {
                // res.send(data)
                res.render('listCategory', { data })
            })
            .catch(err => {
                console.log(err)

                res.send(err)
            })
    }
}

module.exports = Controller