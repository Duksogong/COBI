const express = require('express')
const router = express.Router()
const config = require('../config/key')

//웹문서 파싱
const axios = require('axios')
const cheerio = require('cheerio')

//모델
const { Review } = require('../models/Review')
const { Category } = require('../models/Category')

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
      res.status(200).json({
        success: true,
        result: response.data,
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
router.get('/category', async (req, res) => {
  try {
    const url = req.query.query;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // 웹 페이지에서 카테고리 이름 추출
    const categoryName = $('.bookCatalogTop_category__LIOY2').eq(1).text();

    // MongoDB에서 카테고리 ID 찾기
    const foundCategory = await Category.findOne({ name: categoryName });

    if (foundCategory) {
        // 찾은 카테고리의 ID를 응답으로 전송
        res.status(200).json({ categoryId: foundCategory._id });
    } else {
        // 카테고리를 찾지 못한 경우 기타 카테고리
        res.status(404).json({ categoryId: "656f8decc27e8e4307583e81" }); //기타
    }
} catch (err) {
    // 오류가 발생한 경우 500 응답
    console.error('에러:', err);
    res.status(500).json({ error: '내부 서버 오류' });
}
  // axios.get(url)
  //   .then(response => {
  //     const $ = cheerio.load(response.data)
  //     const category = $('.bookCatalogTop_category__LIOY2').eq(1).text()
  //     res.status(200).end(category)
  //   })
  //   .catch(err => {
  //     res.status(err)
  //   })
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