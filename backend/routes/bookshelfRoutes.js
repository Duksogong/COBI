const express = require('express')
const router = express.Router()
const config = require('../config/key')

//middleware
const { auth } = require('../middleware/auth')

//모델
const { Review } = require('../models/Review')

//사용자 감상평 불러오기
router.get('/', auth, (req, res) => {
  Review.find({ user: req.user._id })
    .then((reviews) => {
      if(!reviews || reviews.length === 0) {
        return res.json({ 
          success: true,
          result: [],
          message: 'No reviews found for the given userId.' 
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