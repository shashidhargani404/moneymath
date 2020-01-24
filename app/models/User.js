const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 4,
        maxlength: 12
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (email) => {
                return validator.isEmail(email)
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 128
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    tokens: [
        {
            token: {
                type: String
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
})

// pre-hook for password encryption
userSchema.pre('save', function(next){
    const user = this
    if(user.isNew) {
        bcryptjs.genSalt(10)
        .then((salt) => {
            bcryptjs.hash(user.password, salt)
                .then((encryptedPassword) => {
                    user.password = encryptedPassword
                    next()
                })
        })
    } else {
        next()
    }
})

// Instance method for jwt token generation
userSchema.methods.generateToken = function(){
    const user = this
    const tokenData = {
        _id: user._id,
        email: user.email
    }
    const token = jwt.sign(tokenData, 'moneyMath')
    user.tokens.push({
        token
    })
    return user.save()
        .then(() => {
            return Promise.resolve(token)
        })
        .catch((err) => {
            return Promise.reject(err)
        })
}

// static mathod for finding user by credentials
userSchema.statics.findByCredentials = function(email, password) {
    const User = this
    return User.findOne({email})
        .then((user) => {
            if(!user) {
                return Promise.reject({ passwordError: 'Sorry, your password was incorrect. Please double-check your password.' })
            }
            return bcryptjs.compare(password, user.password)
                .then((result) => {
                    if(result) {
                        return Promise.resolve(user)
                    } else {
                        return Promise.reject({ passwordError: 'Sorry, your password was incorrect. Please double-check your password.' })
                    }
                })
                .catch((err) => {
                    return Promise.reject(err)
                })
        })
        .catch((err) => {
            return Promise.reject(err)
        })
}

// static method for finding user by token
userSchema.statics.findByToken = function(token) {
    const User = this
    let tokenData
    try {
        tokenData = jwt.verify(token, 'moneyMath')
    } catch (err) {
        return Promise.reject(err)
    }
    return User.findOne({
        _id: tokenData._id,
        email: tokenData.email,
        'tokens.token': token
    })
}

const User = mongoose.model('User', userSchema)

module.exports = User