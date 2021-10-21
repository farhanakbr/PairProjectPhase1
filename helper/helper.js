const bcrypt = require('bcryptjs');

function isValidAccount(passDB, input) {
    let isValid = bcrypt.compareSync(input, passDB);
    if (isValid === true) {
        return true
    }
}


function middleware(req, res, next) {
    console.log(req.session.role, 'midleee');
    if (req.session.role) {
        next()
    } else {
        res.redirect('/user/login')
    }
}

function isAdmin(req, res, next) {
    console.log(req.session, 'adminnn');
    if (req.session.role === 'Admin') {
        next()
    } else {
        res.redirect('/home')
    }
}

module.exports = {isValidAccount, middleware, isAdmin}