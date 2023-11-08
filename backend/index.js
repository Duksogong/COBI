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
    // 사용자 등록 성공
    return User.findOneAndUpdate(
      { email: req.body.email },
      { new_password1: req.body.password, new_password2: req.body.password }
    );
  })
  .then(() => {
    // 비밀번호 업데이트 성공
    res.status(200).json({
      success: true,
      message: "등록 및 비밀번호 업데이트 성공"
    });
  })
  .catch((err) => {
    // 오류 처리
    res.status(400).json({
      success: false,
      message: "등록 또는 비밀번호 업데이트 실패",
      error: err
    });
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
        .json({loginSuccess: true, _id: user._id, userId: user.userId})
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
    userId : req.user.userId,
    nickname : req.user.nickname,
    email : req.user.email,
    password : req.user.password,
    new_password1 : req.user.new_password1,
    new_password2 : req.user.new_password2,
    profile_image : req.user.profile_image,
    role : req.user.role
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

app.post('/api/users/reset_password', auth, (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.json({ checkSuccess: false, message: "현재 유저 정보가 일치하지 않습니다." });
      }
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch) {
          return res.json({ checkSuccess: false, message: "현재 유저 정보가 일치하지 않습니다." });
        }

        if (user.new_password1 !== req.body.new_password1) {
          if (req.body.new_password1.length >= 8) {
            if (req.body.new_password1 === req.body.new_password2) {
              user.generateHash(req.body.new_password2, (err, hash) => {
                if (!hash) {
                  return res.json({ hashSetSuccess: false, message: "hash가 생성되지 않았습니다." });
                }

                User.findOneAndUpdate(
                  { email: req.body.email },
                  { password: hash, new_password1: req.body.new_password1, new_password2: req.body.new_password2 })
                  .then(() => {
                    res.status(200).json({ hashSetSuccess: true, message: "비밀번호 및 새로운 비밀번호 설정 성공" })
                  })
                  .catch((err) => {
                    res.json({ hashSetSuccess: false, message: "비밀번호 및 새로운 비밀번호 설정에 실패했습니다.", error: err })
                  })
              })
            } else {
              return res.json({ checkSuccess: false, message: "pw1과 pw2이 다릅니다" });
            }
          } else {
            return res.json({ checkSuccess: false, message: "8보다 크게 설정해주세요" });
          }
        } else {
          return res.json({ checkSuccess: false, message: "새 비밀번호가 현재 비밀번호와 같으면 안됩니다" });
        }
      });
    })
    .catch((err) => {
      return res.status(400).json({ UserSuccess: false, message: "User 접근에 실패했습니다.", error: err })
    });
});

app.post('/api/users/reset_nickname', auth, (req, res) => {
  const newNickname = req.body.nickname;

  // 닉네임이 이미 존재하는지 확인
  User.findOne({ nickname: newNickname })
    .then((existingUser) => {
      if (existingUser) {
        // 이미 존재하는 경우 오류 반환
        console.log('이미 존재하는 nickname입니다.');
        return res.json({ success: false, message: "이미 있는 nickname입니다." });
      }

      // 닉네임이 존재하지 않는 경우, 현재 사용자의 닉네임을 업데이트
      User.findOneAndUpdate(
        { _id: req.user._id },
        { nickname: newNickname },
        { new: true } // 업데이트된 문서를 반환하도록 설정
      )
        .then((updatedUser) => {
          if (!updatedUser) {
            return res.json({ success: false, message: "닉네임 변경을 실패했습니다." });
          }
          console.log('닉네임 변경 성공');
          res.status(200).json({ success: true, message: "닉네임 변경 성공" });
        })
        .catch((err) => {
          console.log('닉네임 변경 실패');
          res.json({ success: false, message: "닉네임 변경을 실패했습니다.", error: err });
        });
    })
    .catch((err) => {
      console.log('User 접근 실패');
      res.json({ checkSuccess: false, message: "User 접근에 실패했습니다.", error: err });
    });
});

//===============================================================================

app.listen(port, () => console.log(`Exmaple app listening on port ${port}!`))
