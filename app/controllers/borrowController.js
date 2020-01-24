const Borrow = require('../models/Borrow')

module.exports.list = (req, res) => {
    const { user } = req
    Borrow.find({ user: user._id }).populate('category', ['name'])
        .then((borrows) => {
            res.send(borrows)
        })  
        .catch((err) => {
            res.send(err)
        }) 
}

module.exports.create = (req, res) => {
    const { user, body } = req
    body.user = user._id
    const borrow = new Borrow(body)
    borrow.save()
        .then((borrow) => {
            Borrow.findOne({ _id: borrow._id, user: user._id }).populate('category', ['name'])
                .then((borrow) => {
                    res.send(borrow)
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
    Borrow.findOneAndUpdate({ _id: id, user: user._id }, body, { new: true, runValidators: true }).populate('category', ['name'])
        .then((borrow) => {
            res.send(borrow)
        })
        .catch((err) => {
            res.send(err)
        })
}

module.exports.trashAndStar = (req, res) => {
    const { user, body } = req
    Borrow.updateMany({ _id: { $in: body.selects }, user: user._id }, { $set: { [body.propType]: body.value }})
        .then(() => {
            Borrow.find({ user: user._id }).populate('category', ['name'])
                .then((borrows) => {
                    res.send(borrows)
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
    Borrow.deleteMany( { _id: { $in: body.selects }, user: user._id })
        .then(() => {
            Borrow.find({ user: user._id }).populate('category', ['name'])
                .then((borrows) => {
                    res.send(borrows)
                })
                .catch((err) => {
                    res.send(err)
                })
        })
        .catch((err) => {
            res.send(err)
        })
}