const express = require('express')
const router = express.Router()

const { User } = require('../models/User')

router.get("/userInfo/:userId", async (req, res) => {
  const { userId } = req.params;
  
  try {
    const user = await User.findById(userId)
    if(!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      })
    }
    return res.status(200).json({
      success: true,
      result: user
    })
  } catch(err) {
    if (err.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: "Invalid userId format",
      });
    }
    
    return res.status(500).json({
      success: false,
      error: err.message
    })
  }
})

module.exports = router