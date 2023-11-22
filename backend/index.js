const express = require('express')
const app = express()
const port = 5000
const config = require('./config/key')

//bodyParser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//mongoose 연결
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

//router 마운트
const searchRoutes = require('./routes/searchRoutes')
app.use('/api/search', searchRoutes)

//서버 실행
app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})