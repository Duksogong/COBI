const express = require('express')
const router = express.Router()
const config = require('../config/key')

//웹문서 파싱
const axios = require('axios')
const cheerio = require('cheerio')

//모델
const { Review } = require('../models/Review')

// 네이버 검색 API 정보
let client_id = config.bookApiID
let client_secret = config.bookApiSECRET

//책 제목으로 검색
router.get('/book/title', (req, res) => {
  const api_url = 'https://openapi.naver.com/v1/search/book_adv.json?d_titl=' + encodeURI(req.query.query)
  const headers = {
    'X-Naver-Client-id': client_id, 
    'X-Naver-Client-Secret': client_secret
  }

  axios.get(api_url, { headers })
    .then(response => {
      const books = response.data.items.map(item => ({
        title: item.title,
        link: item.link,
        image: item.image,
        author: item.author,
        publisher: item.publisher,
        pubdate: item.pubdate,
        isbn: item.isbn,
      }))

      res.status(200).json({
        success: true,
        result: {
          total: response.data.total,
          start: response.data.start,
          items: books,
        }
      })
    })
    .catch(err => {
      res.status(500).json({ error: 'Internal Server Error' })
    })
})

//책 isbn으로 검색
router.get('/book/isbn', (req, res) => {
  const api_url = 'https://openapi.naver.com/v1/search/book_adv.json?d_isbn=' + encodeURI(req.query.query)
  const headers = {'X-Naver-Client-id': client_id, 'X-Naver-Client-Secret': client_secret}

  axios.get(api_url, { headers })
    .then(response => {
      res.status(200).json({
        success: true,
        result: response.data
      })
    })
    .catch(err => {
      res.status(500).json({ error: 'Internal Server Error' })
    })
})

//책 카테고리 - 웹문서 크롤링
router.get('/category', (req, res) => {
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
router.get('/review', (req, res) => {
  Review.find({ isbn: req.query.query })
    .then((reviews) => {
      if(!reviews || reviews.length === 0) {
        return res.json({ 
          success: true,
          result: [],
          message: 'No reviews found for the given ISBN.' 
        })
      } else {
        return res.json({
          success: true,
          result: reviews
        })
      }
    })
    .catch((err) => {
      return res.status(500).json({ error: `Internal Server Error - ${err.message}` })
    })
})

module.exports = router