const Lend = require('../models/Lend')

module.exports.list = (req, res) => {
    const { user } = req
    Lend.find({ user: user._id }).populate('category', ['name'])
        .then((lends) => {
            res.send(lends)
        })
        .catch((err) => {
            res.send(err)
        })
}

module.exports.create = (req, res) => {
    const { user, body } = req
    body.user = user._id
    const lend = new Lend(body)
    lend.save()
        .then((lend) => {
            Lend.findOne({ _id: lend._id, user: user._id }).populate('category', ['name'])
                .then((lend) => {
                    res.send(lend)
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
    Lend.findOneAndUpdate({ _id: id, user: user._id }, body, { new: true, runValidators: true }).populate('category', ['name'])
        .then((lend) => {
            res.send(lend)
        })
        .catch((err) => {
            res.send(err)
        })
}

module.exports.trashAndStar = (req, res) => {
    const { user, body } = req
    Lend.updateMany({ _id: { $in: body.selects }, user: user._id }, { $set: { [body.propType]: body.value }})
        .then(() => {
            Lend.find({ user: user._id }).populate('category', ['name'])
                .then((lends) => {
                    res.send(lends)
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
    const { user, body } = req
    Lend.deleteMany( { _id: { $in: body.selects }, user: user._id })
        .then(() => {
            Lend.find({ user: user._id }).populate('category', ['name'])
                .then((lends) => {
                    res.send(lends)
                })
                .catch((err) => {
                    res.send(err)
                })
        })
        .catch((err) => {
            res.send(err)
        })
}