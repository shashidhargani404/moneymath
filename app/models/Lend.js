const mongoose = require('mongoose')

const lendSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    description: {
        type: String,
        default: 'No information available'
    },
    createdAt: {
        type: Date,
        default: Date.now()
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

const Lend = mongoose.model('Lend', lendSchema)

module.exports = Lend