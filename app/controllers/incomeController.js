const Income = require('../models/Income')

module.exports.list = (req, res) => {
    const { user } = req
    Income.find({ user: user._id }).populate('category', ['name'])
        .then((incomes) => {
            res.send(incomes)
        })
        .catch((err) => {
            res.send(err)
        })
}

module.exports.create = (req, res) => {
    const { body, user } = req
    body.user = user._id
    const income = new Income(body)
    income.save()
        .then((income) => {     
            Income.findOne({ _id: income._id, user: user._id }).populate('category', ['name'])
                .then((income) => {
                    res.send(income)
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
    const { body, user } = req
    const id = req.params.id
    Income.findOneAndUpdate({ _id: id, user: user._id }, body, { new: true, runValidators: true }).populate('category', ['name'])
        .then((income) => {
            res.send(income)
        })
        .catch((err) => {
            res.send(err)
        })
}

module.exports.trashAndStar = (req, res) => {
    const { body, user } = req
    Income.updateMany({ _id: { $in: body.selects }, user: user._id }, { $set: { [body.propType]: body.value }})
        .then(() => {
            Income.find({ user: user._id }).populate('category', ['name'])
                .then((incomes) => {
                    res.send(incomes)
                })
                .catch((err) => {
                    res.send(err)
                })
        })
        .catch((err) => {
            console.log(err)
        })
}

module.exports.removeTrash = (req, res) => {
    const { body, user } = req
    Income.deleteMany( { _id: { $in: body.selects }, user: user._id })
        .then(() => {
            Income.find({ user: user._id }).populate('category', ['name'])
                .then((incomes) => {
                    res.send(incomes)
                })
                .catch((err) => {
                    res.send(err)
                })
        })
        .catch((err) => {
            res.send(err)
        })
}