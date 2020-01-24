const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId
    },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['income', 'expense', 'borrow', 'lend', 'other']
    }
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category