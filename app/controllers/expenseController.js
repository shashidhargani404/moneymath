const Expense = require('../models/Expense')

module.exports.list = (req, res) => {
    const { user } = req
    Expense.find({ user: user._id }).populate('category', ['name'])
        .then((expenses) => {
            res.send(expenses)
        })
        .catch((err) => {
            res.send(err)
        })
}

module.exports.create = (req, res) => {
    const { user, body } = req
    body.user = user._id
    const expense = new Expense(body)
    expense.save()
        .then((expense) => {
            Expense.findOne({ _id: expense._id, user: user._id }).populate('category', ['name'])
                .then((expense) => {
                    res.send(expense)
                })
                .catch((err) => {
                    res.send(err)
                })
        })
        .catch((err) => {
            res.send(err)
        })
}

module.exports.edit = (req, res) => {
    const { user, body } = req
    const id = req.params.id
    Expense.findOneAndUpdate({ _id: id, user: user._id }, body, { new: true, runValidators: true}).populate('category', ['name'])
        .then((expense) => {
            res.send(expense)
        })
        .catch((err) => {
            res.send(err)
        })
}

module.exports.trashAndStar = (req, res) => {
    const { user, body } = req
    Expense.updateMany({ _id: { $in: body.selects }, user: user._id }, { $set: { [body.propType]: body.value }})
        .then(() => {
            Expense.find({ user: user._id }).populate('category', ['name'])
                .then((expenses) => {
                    res.send(expenses)
                })
                .catch((err) => {
                    res.send(err)
                })
        })
        .catch((err) => {
            res.send(err)
        })
}

module.exports.removeTrash = (req, res) => {
    const { user, body } = req
    Expense.deleteMany({ _id: { $in: body.selects }, user: user._id })
        .then(() => {
            Expense.find({ user: user._id }).populate('category', ['name'])
                .then((expenses) => {
                    res.send(expenses)
                })
                .catch((err) => {
                    res.send(err)
                })
        })
        .catch((err) => {
            res.send(err)
        })
}