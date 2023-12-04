const express = require('express')
const router = express.Router()
const config = require('../config/key')

//middleware
const { auth } = require('../middleware/auth')

//모델
const { Review } = require('../models/Review')

//사용자 감상평 불러오기
router.get('/myReview', auth, (req, res) => {
  //최신순으로 정렬하여 전달
  Review.find({ user: req.user._id }).sort({created_at: -1})
    .then((reviews) => {
      if(!reviews || reviews.length === 0) {
        return res.json({})
      } else {
        return res.json(reviews)
      }
    })
    .catch((err) => {
      return res.status(500).json({ error: `Internal Server Error - ${err.message}` })
    })
})

module.exports = router