// models/Comment.js

const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  reviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String, // 사용자 이름을 저장할 수 있는 타입으로 변경
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment };