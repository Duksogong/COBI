const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        trim: true,
        unique: 1
    }, 
    nickname: {
        type: String, 
        trim: true,
        maxlength: 50
    }, 
    password: {
        type: String,
        minlength: 5
    },
    profile_image: String,
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    },
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    },
    role: {
        type: Number,
        dafault: 0
    },
})

//===============================================================================

userSchema.pre('save', function( next ) {
    var user = this

    if(user.isModified('password')) {
        user.generateHash(user.password, (err, hash) => {
            if(!hash) {
                return;
            }
            user.password = hash
            next()
        })
    } else {
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err)
        cb(null, isMatch)
    })
}

userSchema.methods.generateHash = function(plainPassword, cb) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) return next(err)
        bcrypt.hash(plainPassword, salt, function (err, hash) {
            if (err) return cb(err)
            cb(null, hash)
        })
    })
}

userSchema.methods.generateToken = function(cb) {
    var user = this;
    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    user.token = token
    user
    .save()
    .then((user) => {
        cb(null, user)
    })
    .catch((err) => {
        cb(err)
    })
}

userSchema.statics.findByToken = function(token) {
    var user = this;

    return new Promise((resolve, reject) => {
        jwt.verify(token, 'secretToken',(err, decoded) => {
            if (err) {
                reject(err);
            }
            user
            .findOne({"_id" : decoded, "token" : token})
            .then(user => {
                if (!user) {reject('User not found')}
                resolve(user)
            })    
            .catch(err => {
                reject(err)
            })
        })
    })
}

//===============================================================================

const User = mongoose.model('User', userSchema)
module.exports = { User }