const mongoose = require('mongoose')

const borrowSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        default: 'No information available'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    isPending: {
        type: Boolean,
        default: true
    },
    isTrashed: {
        type: Boolean,
        default: false
    },
    isStarred: {
        type: Boolean,
        default: false
    }
})

const Borrow = mongoose.model('Borrow', borrowSchema)

module.exports = Borrow