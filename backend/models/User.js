const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const { Counter } = require("./Counter")

const userSchema = mongoose.Schema({
    userId: {
        type: Number,
        default: 0,
    },
    nickname: {
        type: String, 
        trim: true,
        maxlength: 50,
        unique: 1
    }, 
    email: {
        type: String,
        trim: true,
        unique: 1
    }, 
    password: {
        type: String,
        minlength: 5
    },
    profile_image: String,
    created_at: {
        type: String,
        maxlength: 50
    },
    updated_at: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        dafault: 0
    },
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

//===============================================================================

userSchema.pre('save', function( next ) {
    var user = this

    Counter.findOne({ id: 0 }, (err, res) => {
        if (err) return err;
        let up = res.userIdCounter + 1;
        Counter.updateOne({ id: 0 }, { userIdCounter: up }, (err) => {
        if (err) return err;
        User.updateOne({ email: user.email }, { userId: up }, (err) => {
            if (err) return err;
        });
        });
    });

    if(user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                user.password = hash
                next()
            })
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