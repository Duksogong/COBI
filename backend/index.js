const express = require('express')
const app = express()
const port = 5000

const config = require('./config/key')

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI)
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err))

const { User } = require("./models/User")

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const cookieParser = require('cookie-parser')
app.use(cookieParser())

const { auth } = require('./middleware/auth')

//===============================================================================

app.post('/api/users/register', (req, res) => {
    const user = new User(req.body)
  
    user
    .save()
    .then(() => {
        res.status(200).json({
            success: true
        })
    })
    .catch((err) => {
        res.json({
            success: false, err
        })
    })
  })
  
  app.post('/api/users/login', (req, res) => {
    User
    .findOne({email: req.body.email})
    .then((user) => {
      if(!user){
        return res.json({
          loginSuccess: false,
          messsage: "제공된 이메일에 해당하는 유저가 없습니다."
        })
      }
      user.comparePassword(req.body.password, (err, isMatch) => {
        if(!isMatch) {
          return res.json({loginSuccess: false, messsage: "비밀번호가 틀렸습니다."})
        }
        user.generateToken((err, user)=>{
          if(err) {
            return res.status(400).send(err)
          }
          res.cookie("x_auth", user.token)
          .status(200)
          .json({loginSuccess: true, userId: user._id})
        })
      })
    })
    .catch((err) => {
      return res.status(400).send(err)
    })
  })
  
  app.get('/api/users/auth', auth, (req, res) => {
    res.status(200).json({
        _id : req.user._id,
        isAdmin : req.user.role === 0 ? false : true,
        isAuth : true,
        email : req.user.email,
        name : req.user.name,
        lastname : req.user.lastname,
        role : req.user.role,
        image : req.user.image
    })
  })
  
  app.get('/api/users/logout', auth, (req, res) => {
    User
    .findOneAndUpdate(
      { _id: req.user._id },
      { token: "" }
    )
    .then(() => {
      res.status(200).send({
        success: true
      })
    })
    .catch((err) => {
      res.json({ success: false, err })
    })
  })

  //===============================================================================

app.listen(port, () => console.log(`Exmaple app listening on port ${port}!`))

