const mongoose = require('mongoose')

const incomeSchema = new mongoose.Schema({
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
    isTrashed: {
        type: Boolean,
        default: false
    },
    isStarred: {
        type: Boolean,
        default: false
    }
})

const Income = mongoose.model('Income', incomeSchema)

module.exports = Income