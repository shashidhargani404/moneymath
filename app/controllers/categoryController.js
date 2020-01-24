const Category = require('../models/category')

module.exports.list = (req, res) => {
    const { user } = req
    Category.find({ user: user._id })
        .then((categories) => {
            res.send(categories)
        })
        .catch((err) => {
            res.send(err)
        })
}

module.exports.create = (req, res) => {
    const { user, body } = req
    body.user = user._id
    const category = new Category(body)
    category.save()
        .then((category) => {
            res.send(category)
        })
        .catch((err) => {
            res.send(err)
        })
}