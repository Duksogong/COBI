const express = require('express')
const app = express()
const port = 5000
const config = require('./config/key')

//웹문서 파싱
const axios = require('axios')
const cheerio = require('cheerio')

//bodyParser
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//mongoose 연결
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

//모델
const { Review } = require('./models/Review')

//네이버 검색 API - 도서
var client_id = 'EjE7zz7rypVA9GC28VpF'
var client_secret = 'IiNCJ63ats'

//책 제목으로 검색
app.get('/api/search/book/title', (req, res) => {
  const api_url = 'https://openapi.naver.com/v1/search/book_adv.json?d_titl=' + encodeURI(req.query.query)
  const headers = {
    'X-Naver-Client-id': client_id, 
    'X-Naver-Client-Secret': client_secret
  }

  axios.get(api_url, { headers })
    .then(response => {
      res.status(200).json(response.data)
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ error: 'Internal Server Error' })
    })
})

//책 isbn으로 검색
app.get('/api/search/book/isbn', (req, res) => {
  const api_url = 'https://openapi.naver.com/v1/search/book_adv.json?d_isbn=' + encodeURI(req.query.query)
  const headers = {'X-Naver-Client-id': client_id, 'X-Naver-Client-Secret': client_secret}

  axios.get(api_url, { headers })
    .then(response => {
      res.status(200).json(response.data)
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ error: 'Internal Server Error' })
    })
})

//책 카테고리 - 웹문서 크롤링
app.get('/api/category', (req, res) => {
  const url = req.query.query
  axios.get(url)
    .then(response => {
      const $ = cheerio.load(response.data)
      const category = $('.bookCatalogTop_category__LIOY2').eq(1).text()
      res.status(200).end(category)
    })
    .catch(err => {
      res.status(err)
    })
})

//책 isbn으로 감상평 검색
app.post('/api/search/review', async (req, res) => {
  try {
    //요청된 iban과 일치하는 감상평 목록
    const reviews = await Review.find({ isbn: req.body.isbn }).exec()

    if(!reviews || reviews.length === 0) {
      return res.json({ message: 'No reviews found for the given ISBN.' })
    } else {
      return res.json(reviews)
    }
  } catch(err) {
    console.error(err)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

//서버 실행
app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})