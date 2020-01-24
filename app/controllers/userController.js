const User = require('../models/User')
const _ = require('lodash')

module.exports.register = (req, res) => {
    const user = new User(req.body)
    user.save()
        .then((user) => {
            user.generateToken()
                .then((token) => {
                    res.send({user: _.pick(user, ['username', 'email']), token})
                })
                .catch((err) => {
                    res.send(err)
                })
        })
        .catch((err) => {
            res.send(err)
        })
}

module.exports.login = (req, res) => {
    const { email, password } = req.body
    User.findByCredentials(email, password)
        .then((user) => {
            user.generateToken()
                .then((token) => {
                    res.send({user: _.pick(user, ['username', 'email']), token})
                })
                .catch((err) => {
                    res.send(err)
                })
        })
        .catch((err) => {
            res.send(err)
        })
}

module.exports.account = (req, res) => {
    const user = _.pick(req.user, ['username', 'email'])
    res.send(user)
}